import React, { FC, useState, useContext, useImperativeHandle } from 'react'
import { TextField, Button, FormControlLabel, Checkbox, IconButton, Fab, Icon, Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core'
import { GlobalContext } from '../../context/GlobalContext'
import { Account } from '../../interfaces'

const AccountsDialog: FC<any> = ({ updateList, forwardRef }) => {
    const { DISPATCH, showSnackbar, accountIconList } = useContext(GlobalContext)

    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [amount, setAmount] = useState('')
    const [defaultAcc, setDeafaultAcc] = useState(false)
    const [dialogStatus, setDialogStatus] = useState(false)
    const [accountIcon, setAccountIcon] = useState('credit_card')
    const [actionType, setActionType] = useState('add')

    const handleAccount = async (event: React.FormEvent<any>) => {
        event.preventDefault()

        if (actionType === 'add') {
            const data = { name,
                description: desc,
                iconName: accountIcon,
                default: defaultAcc,
                currentBalance: amount === '' ? 0 : parseFloat(amount), 
            }
            const response = await DISPATCH('post', '/accounts', data)
            
            if (response !== null) {
                updateList()
                showSnackbar('Konto zostało dodane')
            } else {
                showSnackbar('Błąd dodawania konta')
            }
            setDialogStatus(false)

        } else if (actionType === 'edit') {
            const data = { name,
                description: desc,
                iconName: accountIcon,
                default: defaultAcc,
                currentBalance: amount === '' ? 0 : parseFloat(amount), 
            }
            const response = await DISPATCH('put', `/accounts/${id}`, data)
            
            if (response !== null) {
                updateList()
                showSnackbar('Konto zostało zmodyfikowane')
            } else {
                showSnackbar('Błąd modyfikacji konta')
            }
            setDialogStatus(false)
        }
    }

    const balanceController = (value: string) => {
        const splited: string[] = value.split('')
        const cleared: string[] = []
        const rgx: RegExp = /^[0-9]?[.]?[0-9]*$/

        // eslint-disable-next-line
        splited.map((item: string): void => {
            const parsed: RegExpMatchArray | null = item.match(rgx)
            parsed?.input && cleared.push(parsed.input)
        })

        const glueIt: string = cleared.join('')
        const floatStyle: string[] = glueIt.split('.')
        let floatSliced: string = ''
        let result: string = ''

        if (floatStyle.length > 1 && floatStyle[1].length > 2) {
            floatSliced = floatStyle[1].slice(0, 2)
        } 

        if (floatSliced) {
            result = `${floatStyle[0]}.${floatSliced}`
        } else if (floatStyle[1]) {
            result = `${floatStyle[0]}.${floatStyle[1]}`
        } else {
            result = floatStyle[0]
        }

        setAmount(result)
    }

    const showDialogAddNew = () => {
        setId(0)
        setActionType('add')
        setName('')
        setDesc('')
        setAmount('')
        setAccountIcon('credit_card')
        setDialogStatus(true)
    }

    useImperativeHandle(forwardRef, () => ({ deleteAccount }))

    const deleteAccount = (account: Account) => {
        setActionType('edit')
        setId(account.id)
        setName(account.name)
        setDesc(account.description === null ? '' : account.description)
        setAmount((account.currentBalance).toString() || '')
        setAccountIcon(account.iconName)
        setDialogStatus(true)
    }

    return (
        <div className="dialog-account">
            <Dialog
                open={dialogStatus}
                onClose={() => setDialogStatus(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="module-accounts-modal"
            >
                <DialogTitle>
                    {actionType === 'add' ? 'Dodaj nowe konto' : 'Edytuj konto'}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleAccount}>
                        <TextField
                            margin="normal"
                            variant="outlined"
                            required
                            label="Nazwa"
                            name="add-acc-name"
                            autoFocus
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                        <TextField
                            margin="normal"
                            variant="outlined"
                            name="add-acc-desc"
                            label="Opis"
                            multiline
                            rows={4}
                            value={desc}
                            onChange={event => setDesc(event.target.value)}
                        />
                        {actionType === 'add' ? (
                            <TextField
                                margin="normal"
                                variant="outlined"
                                name="add-acc-amount"
                                label="Saldo konta"
                                value={amount}
                                onChange={event => setAmount(event.target.value)}
                                onBlur={event => balanceController(event.target.value)}
                            />
                        ) : null}
                        <div className="choose-icon">
                            <span>Wybierz ikonę</span>
                            {accountIconList.map((item: string, index: number) => (
                                <div key={index} className="icon">
                                    {item === accountIcon ? (
                                        <IconButton color="secondary" disabled>
                                            <Icon>{item}</Icon>
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={() => setAccountIcon(item)}>
                                            <Icon>{item}</Icon>
                                        </IconButton>
                                    )}
                                </div>
                            ))}
                        </div>
                        <FormControlLabel
                            className="agreement"
                            control={
                                <Checkbox
                                    value="remember"
                                    checked={defaultAcc}
                                    onChange={event => setDeafaultAcc(!defaultAcc)}
                                    color="primary"
                                />
                            }
                            label="Ustaw konto jako domyślne"
                        />
                        <Button
                            className="btn-submit"
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            {actionType === 'add' ? 'Dodaj konto' : 'Zapisz zmiany'}
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogStatus(false)} color="primary">Anuluj</Button>
                </DialogActions>
            </Dialog>
            <div className="floating-add-new">
                <Fab
                    variant="round"
                    color="secondary"
                    onClick={() => showDialogAddNew()}
                >
                    <Icon>add</Icon>
                </Fab>
            </div>
        </div>
    )
}

export default AccountsDialog
