import React, { useEffect, useContext, useState, FC, useImperativeHandle } from 'react'
import { Table, Icon, IconButton, TableBody, TableCell, Switch, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { Account } from '../../interfaces'
import { GlobalContext } from '../../context/GlobalContext'

const AccountsList: FC<any> = ({ forwardRef, deleteAccount }: {forwardRef: any, deleteAccount: any}) => {
    const { DISPATCH, showSnackbar, loader } = useContext(GlobalContext)

    const [dialogVisibility, setDialogVisibility] = useState(false)
    const [accountsList, setAccountsList] = useState([])
    const [accountIdForDel, setAccountIdForDel] = useState(0)
    const [downloaded, setDownloaded] = useState(false)

    useEffect(() => {
        getAccountsList()
        // eslint-disable-next-line
    }, [])

    const getAccountsList = async () => {
        const response = await DISPATCH('get', '/accounts')
        response && setAccountsList(response)
        
        setDownloaded(true)
    }

    const handleCloseDialog = async (answer: boolean) => {
        if (answer) {
            const response = await DISPATCH('delete', `/accounts/${accountIdForDel}`)

            if (response !== null) {
                showSnackbar('Konto zostało usunięte')
                getAccountsList()
            } else {
                showSnackbar('Błąd podczas usuwania konta')
            }
        }
        setDialogVisibility(false)
    }

    const handleChangeArchiveStatus = async (account: Account) => {
        const response = await DISPATCH('put', `/accounts/${account.id}`, { archived: !account.archived })
        response && getAccountsList()
    }

    useImperativeHandle(forwardRef, () => ({ getAccountsList }))

    const editAccount = (account: Account) => deleteAccount(account)

    const askForDelete = (id: number) => {
        setAccountIdForDel(id)
        setDialogVisibility(true)
    }

    return (
        <div className="account-list">
            {!loader ? (
                <TableContainer component={Paper}>
                    {accountsList?.length ? (
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="icon-cell" />
                                    <TableCell className="name-cell">Nazwa konta</TableCell>
                                    <TableCell className="desc-cell">Opis</TableCell>
                                    <TableCell align="center" className="balance-cell">Aktualne saldo</TableCell>
                                    <TableCell align="center" className="default-cell">Domyślne</TableCell>
                                    <TableCell align="center" className="archive-cell">Archiwizuj</TableCell>
                                    <TableCell align="center" className="actions-cell" />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {accountsList.map((account: any) => (
                                    <TableRow key={account.id} className={account.archived ? 'archived' : ''}>
                                        <TableCell className="icon-cell">
                                            <Icon>{account.iconName}</Icon>
                                        </TableCell>
                                        <TableCell className="name-cell">{account.name}</TableCell>
                                        <TableCell className="desc-cell">
                                            {account.description}
                                        </TableCell>
                                        <TableCell align="center" className="balance-cell">
                                            {account.currentBalance}
                                        </TableCell>
                                        <TableCell align="center" className="default-cell">
                                            {account.default ? 'Tak' : 'Nie'}
                                        </TableCell>
                                        <TableCell className="archive-cell">
                                            <Switch
                                                checked={account.archived}
                                                onChange={() => handleChangeArchiveStatus(account)}
                                                name="checkedArchive"
                                            />
                                        </TableCell>
                                        <TableCell align="center" className="actions-cell">
                                            <div className="actions">
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="edit-account"
                                                    onClick={() => editAccount(account)}
                                                >
                                                    <Icon>edit</Icon>
                                                </IconButton>
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="delete-account"
                                                    onClick={() => askForDelete(account.id)}
                                                >
                                                    <Icon>delete_forever</Icon>
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (downloaded && <Paper className="alert-msg"><Alert severity="warning" variant="outlined"><span>Lista kont jest pusta</span></Alert></Paper>)}
                </TableContainer>
            ) : null}
            <Dialog open={dialogVisibility} onClose={() => handleCloseDialog(false)}>
                <DialogTitle>Usuwanie konta</DialogTitle>
                <DialogContent>
                    <DialogContentText>Czy jesteś pewnien że chcesz usunąć to konto? Stracisz wszytkie dane z nim związane.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseDialog(false)} color="primary">Anuluj</Button>
                    <Button onClick={() => handleCloseDialog(true)} color="secondary" autoFocus>Usuń</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AccountsList
