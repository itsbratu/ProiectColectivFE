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
import { useRegisterRequest, User } from '../../api/mutations/useRegisterRequest';
import { useEffect } from 'react';
import {useLoginRequest} from "../../api/mutations/useLoginRequest";

const theme = createTheme();

interface Props {
    setToken: (token: string) => void;
    changePage: (url: string) => void;
}

type RegisterError = {
    username: string | null;
    password: string | null;
    confirm_password: string | null;
}
export default function Register({changePage }: Props) {
    const [user, setUser] = useState<User>({ username: "", password: "" })
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const { mutate: register, data: registerData, error } = useRegisterRequest();
    const { mutate: login, data: loginData} = useLoginRequest();
    const [registerError, setRegisterError] = useState<RegisterError>({ username: null, password: null, confirm_password: null })
    const [noSubmitYet, setNoSubmitYet] = useState(true);
    const [lastSubmitSuccess, setLastSubmitSuccess] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setNoSubmitYet(false);
        event.preventDefault();
        if (user.username.length < 3 || user.password.length < 6 || user.password !== passwordConfirmation) {
            setRegisterError({
                ...registerError,
                username: user.username.length < 3 ? "Username should have at least 3 characters" : null,
                password: user.password.length < 6 ? "Password should have at leats 6 characters " : null,
                confirm_password: user.password !== passwordConfirmation ? "Passwords dont match": null
            })
        } else {
            setRegisterError({ username: null, password: null, confirm_password:null })
            await register({ createPayload: user });
        }
    };

    useEffect(() => {
        if (registerData) {
            login({createPayload: user});
        }
    }, [registerData])

    useEffect(() => {
        if (loginData) {
            setLastSubmitSuccess(true);
        }else{
            setLastSubmitSuccess(false);
        }
    }, [loginData])

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
                            value={passwordConfirmation}
                            onChange={e => setPasswordConfirmation(e.target.value)}
                            error={registerError.confirm_password !== null}
                            helperText={registerError.confirm_password}
                        />
                        {error && !hasLocalError() && <Typography mt={3} color="red">Username is taken!</Typography>}
                        {!noSubmitYet && lastSubmitSuccess && <Typography mt={3} color="green"> User registered successfully!</Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={()=>changePage("/login")}
                        >
                            Go to Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}