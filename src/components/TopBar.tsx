import React, { FC} from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Typography, List, ListItem, Icon } from '@material-ui/core'

const TopAppBar: FC<any> = ({ toggleDrawer, name }) => {
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

                        <List>
                            <NavLink to="/profile" className="profile-button">
                                <ListItem button>
                                    <Icon>settings</Icon>
                                </ListItem>
                            </NavLink>
                        </List>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default TopAppBar
