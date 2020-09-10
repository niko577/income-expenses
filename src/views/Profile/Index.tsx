import React, { FC, useEffect, useContext, useState } from 'react'
import { DialogTitle, DialogContent, Button, DialogContentText, DialogActions, Dialog, TextField, Paper, Container, Grid, Icon, Typography } from '@material-ui/core'
import { GlobalContext } from '../../context/GlobalContext'
import Alert from '@material-ui/lab/Alert'

const Profile: FC<any> = () => {
    const { DISPATCH, colors, setAuthorization, setUserData, setNewToken, setLoader, env, token, axios } = useContext(GlobalContext)

    const [open, setOpen] = useState(false)
    const [openPassword, setOpenPassword] = useState(false)
    // const [passwordEditable, setPasswordEditable] = useState(false)
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [color, setColor] = useState('')
    const [editErrors, setEditErrors] = useState([])
    const [passErrors, setPassErrors] = useState([])

    const deleteUserProfile = async () => {
        const response = await DISPATCH('delete', '/auth/delete-user')
            
        if (response !== null) {
            localStorage.removeItem('token')
            setAuthorization(false)
        }
    }

    const getUserData = async () => {
        const response = await DISPATCH('get', '/auth/user-data')
            
        if (response !== null) {
            setData(response)
        }
    }

    const saveData = async () => {
        setLoader(true)
        let result
    
        await axios.post(`${env}/auth/edit-data`, { username: name, email, color }, { 
            headers: { Authorization: `Bearer ${token}` } 
        }).then((response) => {
            result = response.data
        }).catch((response) => {
            result = response.response.data
        }).then(() => {
            setLoader(false)
        })

        if (!result.message) {
            setUserData(result)
            setNewToken(result.accessToken)
            setEditErrors([])
        } else {
            setEditErrors(result.message)
        }
    }

    const setData = (response) => {
        setName(response.username)
        setEmail(response.email)
        setColor(response.color)
    }

    const showConfirm = (answer: boolean) => {
        if (answer) {
            deleteUserProfile()
        } else {
            setOpen(false)
        }
    }

    const showModal = () => {
        setOpen(true)
    }

    const changePassword = async () => {
        setLoader(true)
        let result
    
        await axios.post(`${env}/auth/edit-password`, { oldPassword, newPassword }, { 
            headers: { Authorization: `Bearer ${token}` } 
        }).then((response) => {
            result = response.data
        }).catch((response) => {
            result = response.response.data
        }).then(() => {
            setLoader(false)
        })

        if (!result.message) {
            setOpenPassword(false)
            setPassErrors([])
        } else {
            setPassErrors(result.message)
        }
    }

    useEffect(() => {
        getUserData()
        document.title = 'Money Manager - Profil'
    }, [])

    return (
        <div className="module-profile">
            <Paper square>
                <div className="inner-card">
                    <div className="header">
                        <div className="title">Edycja twojego konta</div>
                    </div>
                    <div>
                        {editErrors.length ?
                            <Alert variant="outlined" severity="error">
                                {editErrors.map((error, index) => <div key={index}>{error}</div>)}
                            </Alert>
                            : null
                        }
                    </div>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            variant="outlined"
                            required
                            label="Nazwa użytkownika"
                            name="edit-name"
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            variant="outlined"
                            required
                            label="Email"
                            name="edit-email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" color="secondary" className="pass-change" onClick={() => setOpenPassword(true)}>Zmień hasło</Button>
                    </Grid>
                    <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>Kolor na tle Twojego avataru</Typography>
                        <div className="bubbles">
                            {colors.map((item: string, index: number) => (
                                <div
                                    role="button"
                                    tabIndex={0}
                                    key={index}
                                    className="item"
                                    onClick={() => setColor(item)}
                                    onKeyDown={() => setColor(item)}
                                >
                                    <div className="checked">
                                        <Icon>{item === color ? 'check' : ''}</Icon>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="btns-line">
                            <Button variant="contained" color="primary" onClick={saveData}>Zapisz zmiany</Button>
                            <Button variant="contained" color="secondary" onClick={showModal}>Usuń konto</Button>
                        </div>
                    </Grid>
                </div>
            </Paper>
            <Dialog
                open={open}
                onClose={() => showConfirm(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Usuwanie tego profilu</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Czy jesteś pewnien że chcesz usunąć swój profil? Stracisz wszytkie
                        dane z nim związane. Zostanie on całkiem usunięty, nie będzie
                        można się już zalogować.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => showConfirm(false)} color="primary">Anuluj</Button>
                    <Button
                        onClick={() => showConfirm(true)}
                        color="secondary"
                        autoFocus
                    >Usuń
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openPassword}
                onClose={() => setOpenPassword(false)}
                className="edit-pass-dialog"
            >
                <DialogTitle>Zmiana hasła</DialogTitle>
                <DialogContent>
                    <div>
                        {passErrors.length ?
                            <Alert variant="outlined" severity="error">
                                {passErrors.map((error, index) => <div key={index}>{error}</div>)}
                            </Alert>
                            : null
                        }
                    </div>
                    <div className="pass-edit-col">
                        <TextField
                            margin="normal"
                            variant="outlined"
                            required
                            label="Podaj stare hasło"
                            name="old-password"
                            value={oldPassword}
                            onChange={event => setOldPassword(event.target.value)}
                        />
                        <TextField
                            margin="normal"
                            variant="outlined"
                            required
                            label="Podaj nowe hasło"
                            name="new-password"
                            value={newPassword}
                            onChange={event => setNewPassword(event.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPassword(false)} color="primary">Anuluj</Button>
                    <Button
                        onClick={() => changePassword()}
                        color="secondary"
                        autoFocus
                    >Zmień
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Profile
