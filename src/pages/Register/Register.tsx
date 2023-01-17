import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
//import { useLoginRequest, User } from '../../api/mutations/useLoginRequest';
import { useRegisterRequest, User } from '../../api/mutations/useRegisterRequest';
import { useEffect } from 'react';
import { USER_STORAGE_KEY } from '../../api/constants';

const theme = createTheme();

interface Props {
    setToken: (token: string) => void;
}

type RegisterError = {
    username: string | null;
    password: string | null;
    confirm_password: string | null;
}

type ConfirmPassword ={
    password: string | null;
}

export default function Register({ setToken }: Props) {
    const [user, setUser] = useState<User>({ username: "", password: "" })
    const { mutate: register, data: registerData, error } = useRegisterRequest();
    const [registerError, setRegisterError] = useState<RegisterError>({ username: null, password: null, confirm_password: null })
    let [confirm_password, setConfirmPassword] = useState<ConfirmPassword>({ password:"" });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (user.username.length < 3 || user.password.length < 6 || user.password !== confirm_password.password) {
            setRegisterError({
                ...registerError,
                username: user.username.length < 3 ? "Username should have at least 3 characters" : null,
                password: user.password.length < 6 ? "Password should have at leats 6 characters " : null,
                confirm_password: user.password !== confirm_password.password ? "Passwords dont match": null
            })
        } else {
            setRegisterError({ username: null, password: null, confirm_password:null })
            await register({ createPayload: user });
        }
    };

    useEffect(() => {
        if (registerData) {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(registerData));
            setToken(registerData.token)
        }
    }, [registerData])

    const hasLocalError = () => registerError.username != null || registerError.password != null || registerError.confirm_password != null

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            autoFocus
                            value={user.username}
                            onChange={e => setUser({ ...user, username: e.target.value })}
                            error={registerError.username !== null}
                            helperText={registerError.username}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={user.password}
                            onChange={e => setUser({ ...user, password: e.target.value })}
                            error={registerError.password !== null}
                            helperText={registerError.password}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirm_password" 
                            label="Confirm Password"
                            type="password"
                            id="confirm_password"
                            autoComplete="confirm-password"
                            value={confirm_password.password}
                            onChange={e => setConfirmPassword({ password: e.target.value })}
                            error={registerError.confirm_password !== null}
                            helperText={registerError.confirm_password}
                        />
                        {error && !hasLocalError() && <Typography mt={3} color="red">Couldn't register with given credentials</Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}