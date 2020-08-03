import React, { FC, useState, MouseEvent, useContext } from 'react'
import { AppBar, Toolbar, IconButton, Typography, DialogTitle, DialogContent, Menu, Button, DialogContentText, DialogActions, Dialog, MenuItem, Icon } from '@material-ui/core'
import { GlobalContext } from '../context/GlobalContext'

const TopAppBar: FC<any> = ({ toggleDrawer, name }) => {
    const { DISPATCH, setAuthorization } = useContext(GlobalContext)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [open, setOpen] = useState(false)

    const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const deleteUserProfile = async () => {
        const response = await DISPATCH('delete', '/auth/delete-user')
            
        if (response !== null) {
            localStorage.removeItem('token')
            setAuthorization(false)
        }
        handleClose()
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
        handleClose()
    }

    return (
        <div className="top-bar">
            <AppBar position="fixed" className="top-bar">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => toggleDrawer()}
                        className="menu-button"
                    >
                        <Icon>menu</Icon>
                    </IconButton>
                    <div className="wrapper-bar">
                        <Typography variant="h6" noWrap>
                            {name}
                        </Typography>
                        <IconButton color="inherit" onClick={openMenu}>
                            <Icon>settings</Icon>
                        </IconButton>
                    </div>
                    <Menu
                        className="setting-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem disabled>Zobacz profil</MenuItem>
                        <MenuItem onClick={() => showModal()} className="delete">
                            <Icon>error_outline_outlined</Icon>Usuń profil
                        </MenuItem>
                    </Menu>
                </Toolbar>
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
            </AppBar>
        </div>
    )
}

export default TopAppBar
