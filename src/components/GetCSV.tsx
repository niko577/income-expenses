import React, { useContext, FC } from 'react'
import { Button, Icon, Dialog, DialogContent, DialogActions, DialogTitle, List, ListItem, ListItemIcon, ListItemAvatar, Avatar, ListItemText, Divider } from '@material-ui/core'
import { GlobalContext } from '../context/GlobalContext'

const GetCSV: FC = () => {
    const { DISPATCH, csvModal, setCsvModal } = useContext(GlobalContext)

    const getFile = async (type: string) => {
        const response = await DISPATCH('get', `/export/${type}`)
        
        if (response !== null) { 
            setCsvModal(false)

            const blob = new Blob([response])
            const link = window.document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `${type}.csv`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }
    

    return (
        <div className="dialog-csv">
            <Dialog
                open={csvModal}
                onClose={() => setCsvModal(false)}
                className="csv-modal"
            >
                <DialogTitle>
                    Pobierz dane w formacie CSV
                </DialogTitle>
                <DialogContent>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button onClick={() => getFile('accounts')}>
                            <ListItemAvatar>
                                <Avatar>
                                    <Icon>credit_card</Icon>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Konta" />
                            <ListItemIcon>
                                <Icon>get_app</Icon>
                            </ListItemIcon>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={() => getFile('categories')}>
                            <ListItemAvatar>
                                <Avatar>
                                    <Icon>category</Icon>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Kategorie" />
                            <ListItemIcon>
                                <Icon>get_app</Icon>
                            </ListItemIcon>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={() => getFile('transactions')}>
                            <ListItemAvatar>
                                <Avatar>
                                    <Icon>receipt</Icon>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Transakcje" />
                            <ListItemIcon>
                                <Icon>get_app</Icon>
                            </ListItemIcon>
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCsvModal(false)} color="primary">Anuluj</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default GetCSV
