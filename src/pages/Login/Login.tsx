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
import { useLoginRequest, User } from '../../api/mutations/useLoginRequest';
import { useEffect } from 'react';
import { USER_STORAGE_KEY } from '../../api/constants';

const theme = createTheme();

interface Props {
    setToken: (token: string) => void;
}

type LoginError = {
    username: string | null;
    password: string | null;
}

export default function Login({ setToken }: Props) {
    const [user, setUser] = useState<User>({ username: "", password: "" })
    const { mutate: login, data: loginData, error } = useLoginRequest();
    const [loginError, setLoginError] = useState<LoginError>({ username: null, password: null })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (user.username.length < 3 || user.password.length < 6) {
            setLoginError({
                ...loginError,
                username: user.username.length < 3 ? "Username should have at least 3 characters" : null,
                password: user.password.length < 6 ? "Password should have at leats 6 characters " : null
            })
        } else {
            setLoginError({ username: null, password: null })
            await login({ createPayload: user });
        }
    };

    useEffect(() => {
        if (loginData) {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loginData));
            setToken(loginData.token)
        }
    }, [loginData])

    const hasLocalError = () => loginError.username != null || loginError.password != null

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
                        Log in
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
                            error={loginError.username !== null}
                            helperText={loginError.username}
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
                            error={loginError.password !== null}
                            helperText={loginError.password}
                        />
                        {error && !hasLocalError() && <Typography mt={3} color="red">Couldn't log in with given credentials</Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log in
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}