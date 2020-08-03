import React, { useImperativeHandle, useContext, useEffect, useState, FC } from 'react'
import { Icon, CssBaseline, Divider, Drawer, Hidden, IconButton, List, Button, ListItem, Avatar, ListItemIcon, ListItemText } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'

const MiniDrawer: FC<any> = ({ forwardRef }) => {
    const { DISPATCH, setAuthorization } = useContext(GlobalContext)

    const [mobileOpen, setMobileOpen] = useState(false)
    const [userData, setUserData] = useState({ email: '' })

    const pageList = [
        ['Strona główna', '/dashboard', 'home'],
        ['Konta', '/accounts', 'credit_card'],
        ['Kategorie', '/categories', 'category'],
        ['Transakcje', '/transactions', 'receipt'],
    ]

    useEffect(() => {
        getUserData()
    // eslint-disable-next-line
  }, [])

    useImperativeHandle(forwardRef, () => {
        return {
            toggleDrawer,
        }
    })

    const toggleDrawer = () => {
        setMobileOpen(!mobileOpen)
    }

    const getUserData = async () => {
        const response = await DISPATCH('get', '/auth/user-data')
            
        if (response !== null) {
            setUserData(response)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setAuthorization(false)
    }

    const drawer = (
        <div className="drawer">
            <div className="toolbar-dtx">
                <div className="current-user">
                    <Avatar>
                        <Icon>person</Icon>
                    </Avatar>
                    <div className="user-name">{userData.email}</div>
                </div>
                <div className="close-drawer">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => toggleDrawer()}
                        className="menu-button"
                    >
                        <Icon>arrow_back_ios</Icon>
                    </IconButton>
                </div>
            </div>
            <Divider />
            <List>
                {pageList.map((page, index) => (
                    <NavLink key={index} to={page[1]}>
                        <ListItem button>
                            <ListItemIcon>
                                <Icon>{page[2]}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={page[0]} />
                        </ListItem>
                    </NavLink>
                ))}
            </List>
            <Divider />
            <Button type="button" onClick={handleLogout} className="logout-btn">Wyloguj</Button>
        </div>
    )

    const container =
    window !== undefined ? () => window.document.body : undefined

    return (
        <div>
            <CssBaseline />
            <nav aria-label="mailbox folders">
                <Hidden mdUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor="left"
                        open={mobileOpen}
                        onClose={toggleDrawer}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer variant="permanent" open>
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    )
}

export default MiniDrawer
