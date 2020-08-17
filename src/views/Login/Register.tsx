import React, { useContext, useState } from 'react'
import { Icon, TextField, Button, Avatar, Typography, Checkbox, FormControlLabel, CssBaseline } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { GlobalContext } from '../../context/GlobalContext'

const RegisterWidget: React.FC = () => {
    const { axios, env, setLoader, setNewToken, setAuthorization } = useContext(GlobalContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState([])

    const handleSignUp = (event: any) => {
        event.preventDefault()
        setLoader(true)

        axios
            .post(`${env}/auth/sign-up`, {
                email,
                password,
            })
            .then((response: any) => {
                setNewToken(response?.data?.accessToken)
                setErrorMessage([])
                setAuthorization(true)
            })
            .catch((error: any) => {
                setErrorMessage(error?.response?.data?.message)
            })
            .then(() => {
                setLoader(false)
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
                        <Typography component="h1" variant="h5">Załóż konto</Typography>
                    </div>
                    <form onSubmit={handleSignUp}>
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
                            name="password"
                            label="Hasło"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                        <FormControlLabel
                            className="agreement"
                            control={<Checkbox value="remember" required color="primary" />}
                            label="Wyrażam zgodę na przetwarzanie moich danych osobowych"
                        />
                        <Button
                            className="btn-submit"
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >Zarejestruj się
                        </Button>
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

export default RegisterWidget
