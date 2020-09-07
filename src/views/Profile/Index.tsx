import React, { FC, useEffect, useContext, useState } from 'react'
import { DialogTitle, DialogContent, Button, DialogContentText, DialogActions, Dialog, TextField, Paper, Container, Grid, Icon, Typography } from '@material-ui/core'
import { GlobalContext } from '../../context/GlobalContext'

const Profile: FC<any> = () => {
    const { DISPATCH, colors, setAuthorization } = useContext(GlobalContext)

    const [open, setOpen] = useState(false)
    const [passwordEditable, setPasswordEditable] = useState(false)

    const [name, setName] = useState('a')
    const [email, setEmail] = useState('a')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [color, setColor] = useState('#e91e63')

    const [nameHistory, setNameHistory] = useState('a')
    const [emailHistory, setEmailHistory] = useState('a')
    const [colorHistory, setColorHistory] = useState('#e91e63')

    const deleteUserProfile = async () => {
        const response = await DISPATCH('delete', '/auth/delete-user')
            
        if (response !== null) {
            localStorage.removeItem('token')
            setAuthorization(false)
        }
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

    useEffect(() => {
        document.title = 'Money Manager - Profil'
    }, [])

    return (
        <div className="module-profile">
            <Paper square>
                <div className="inner-card">
                    <div className="header">
                        <div className="title">Edycja twojego konta</div>
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
                        {passwordEditable ?
                            <Grid container spacing={3} className="pass-list">
                                <Grid item xs={12} md={6} className="grid-fix">
                                    <TextField
                                        margin="normal"
                                        variant="outlined"
                                        required
                                        label="Podaj stare hasło"
                                        name="old-password"
                                        value={oldPassword}
                                        onChange={event => setOldPassword(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} className="grid-fix">
                                    <TextField
                                        margin="normal"
                                        variant="outlined"
                                        required
                                        label="Podaj nowe hasło"
                                        name="new-password"
                                        value={newPassword}
                                        onChange={event => setNewPassword(event.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        : <Button variant="outlined" color="secondary" className="pass-change" onClick={() => setPasswordEditable(true)}>Zmień hasło</Button>
                        }
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
                            <Button variant="contained">Anuluj</Button>
                            <Button variant="contained" color="primary">Zapisz zmiany</Button>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" onClick={showModal}>Usuń konto</Button>
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
        </div>
    )
}

export default Profile
