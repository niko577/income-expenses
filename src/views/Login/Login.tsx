import React, { useContext, useState, FormEvent } from 'react'
import { TextField, Button, Avatar, Typography, CssBaseline, Icon } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { GlobalContext } from '../../context/GlobalContext'

const LoginWidget: React.FC = () => {
    const { axios, env } = useContext(GlobalContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState([])

    const handleSignIn = (event: FormEvent) => {
        event.preventDefault()

        axios
            .post(`${env}/auth/sign-in`, {
                email,
                password,
            })
            .then((response: any) => {
                setErrorMessage([])
            })
            .catch((error: any) => {
                setErrorMessage(error?.response?.data?.message)
            })
            .then(() => {
            })
    }

    return (
        <>
            <div>
                <CssBaseline />
                <div>
                    <div className="heading">
                        <Avatar>
                            <Icon>lock_outlined</Icon>
                        </Avatar>
                        <Typography component="h1" variant="h5">Logowanie</Typography>
                    </div>
                    <form onSubmit={handleSignIn}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="login-password"
                            label="Hasło"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                        <Button
                            className="btn-submit"
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >Zaloguj się</Button>
                    </form>
                </div>
            </div>
            {errorMessage && errorMessage.length ? (
                <div className="alert">
                    <Alert variant="outlined" severity="error">
                        {errorMessage.map((error: string, index: number) => (
                            <div key={index}>{error}</div>
                        ))}
                    </Alert>
                </div>
            ) : null}
        </>
    )
}

export default LoginWidget
