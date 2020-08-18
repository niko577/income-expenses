import React, { FC, useState, useContext, useEffect, ChangeEvent, useImperativeHandle, FormEvent } from 'react'
import { TextField, Button, Fab, Icon, Dialog, DialogContent, DialogActions, DialogTitle, FormControl, InputLabel, MenuItem, Select, Tabs, Tab } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import plLocale from 'date-fns/locale/pl';
import { GlobalContext } from '../../context/GlobalContext'
import { Account, Category, Transaction } from '../../interfaces'

const TransactionDialog: FC<any> = ({ forwardRef, updateList }) => {
    const { DISPATCH } = useContext(GlobalContext)
    const [comment, setComment] = useState('')
    const [dialogStatus, setDialogStatus] = useState(false)
    const [transactions, setTransactions] = useState<any>(null)
    const [selectedAccount, setSelectedAccount] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [amount, setAmount] = useState('')
    const [selectedDate, setSelectedDate] = useState<string>('')
    const [type, setType] = useState(0);
    const [fromAccount, setFromAccount] = useState(0)
    const [toAccount, setToAccount] = useState(0)
    const [sameAccountsError, setSameAccountsError] = useState(false)
    const [amountZero, setAmountZero] = useState(false)
    const [editModalType, setEditModalType] = useState(true)
    const [editedId, setEditedId] = useState(0)

    const handleChangeType = (event: ChangeEvent<{}>, newValue: number) => {
        setType(newValue);
    };

    const handleTransaction = async (event: FormEvent<any>) => {
        event.preventDefault()

        if (parseFloat(amount) <= 0 || amount === '') {
            setAmountZero(true)
        } else {
            setAmountZero(false)
        }

        if (!sameAccountsError && parseFloat(amount) > 0) {
            const data = {
                amount: amount === '' ? 0 : parseFloat(amount),
                comment,
                accountId: selectedAccount,
                categoryId: selectedCategory,
                date: selectedDate,
                sourceAccountId: fromAccount,
                destinationAccountId: toAccount,
                type: type === 0 ? 'EXTERNAL_TRANSACTION' : 'ACCOUNT_TRANSFER',
            }

            let response
            if (editModalType) {
                response = await DISPATCH('put', `/transactions/${editedId}`, data)
            } else {
                response = await DISPATCH('post', '/transactions', data)
            }
        
            if (response !== null) { 
                updateList()
                clearForm()
            }
            setDialogStatus(false)
        }
    }

    const deleteTransaction = async () => {
        const response = await DISPATCH('delete', `/transactions/${editedId}`)
        
        if (response !== null) { 
            updateList()
            clearForm()
            setDialogStatus(false)
        }
    }

    const showDialogAddNew = () => {
        clearForm()
        setDialogStatus(true)
        setEditModalType(false)
    }

    const clearForm = () => {
        setComment('')
        if (transactions?.accounts[0]) {
            const defaultAccount = transactions.accounts.find((account: Account) => account.default)
            setSelectedAccount(defaultAccount.id)
        }
        if (transactions?.categories[0]) {
            setSelectedCategory(transactions.categories[0].id)
        }
        if (transactions?.accounts[0] && transactions?.accounts[1]) {
            const defaultAccount = transactions.accounts.find((account: Account) => account.default)
            setFromAccount(defaultAccount.id)
            const otherAccounts = transactions.accounts.filter((account: Account) => !account.default)
            setToAccount(otherAccounts[0].id)
        }
        setAmount('')
        getCurrentDate(new Date())
    }

    const getTransactions = async () => {
        const response = await DISPATCH('get', '/transactions')
        
        if (response !== null) { 
            setTransactions(response) 
            if (response?.accounts[0]) {
                const defaultAccount = response.accounts.find((account: Account) => account.default)
                setSelectedAccount(defaultAccount.id)
            }
            if (response?.categories[0]) {
                setSelectedCategory(response.categories[0].id)
            }
            if (response?.accounts[0] && response?.accounts[1]) {
                setFromAccount(response.accounts[0].id)
                setToAccount(response.accounts[1].id)
            }
        }
    }

    const handleChangeAccount = (event: ChangeEvent<{ value: unknown }>) => {
        setSelectedAccount(event.target.value as number);
    };
    const handleChangeFromAccount = (event: ChangeEvent<{ value: unknown }>) => {
        setFromAccount(event.target.value as number);
        if (event.target.value === toAccount) {
            setSameAccountsError(true)
        } else {
            setSameAccountsError(false)
        }
    };
    const handleChangeToAccount = (event: ChangeEvent<{ value: unknown }>) => {
        setToAccount(event.target.value as number);
        if (fromAccount === event.target.value) {
            setSameAccountsError(true)
        } else {
            setSameAccountsError(false)
        }
    };

    const handleChangeCategory = (event: ChangeEvent<{ value: unknown }>) => {
        setSelectedCategory(event.target.value as number);
    };

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

    const handleDateChange = (date: any) => {
        getCurrentDate(date)
    };

    const getCurrentDate = (date: any) => {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        const format = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
        setSelectedDate(format)
    }

    const editTransaction = (transaction: Transaction) => {
        setDialogStatus(true)
        setEditModalType(true)

        console.log(transaction);

        setEditedId(transaction.id)
        setType(transaction.type === 'EXTERNAL_TRANSACTION' ? 0 : 1)
        setComment(transaction.comment ? transaction.comment : '')
        setAmount((transaction.amount).toString())
        setSelectedCategory(transaction.categoryId)
        setSelectedDate(transaction.date)
        setSelectedAccount(transaction.accountId)
        setFromAccount(transaction.sourceAccountId)
        setToAccount(transaction.destinationAccountId)
    }

    const accountsList = () => transactions.accounts
    const categoriesList = () => transactions.categories

    useImperativeHandle(forwardRef, () => {
        return {
            editTransaction,
        }
    })

    useEffect(() => {
        getTransactions()
        getCurrentDate(new Date())
        // eslint-disable-next-line
    }, [])

    const title = <DialogTitle>{editModalType ? (type === 0 ? 'Edytuj transakcję' : 'Edytuj przelew') : (type === 0 ? 'Dodaj nową transakcję' : 'Wykonaj przelew')}</DialogTitle>
    const submit = <Button className="btn-submit" type="submit" variant="contained" color="primary">{editModalType ? ('Zapisz zmiany') : (type === 0 ? 'Dodaj transakcję' : 'Wykonaj przelew')}</Button>

    return (
        <div className="dialog-transactions">
            <Dialog
                open={dialogStatus}
                onClose={() => setDialogStatus(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="module-transactions-modal"
            >
                {!editModalType &&
                    <Tabs
                        value={type}
                        indicatorColor="primary"
                        variant="fullWidth"
                        textColor="primary"
                        onChange={handleChangeType}
                    >
                        <Tab label="Transakcja" />
                        <Tab label="Przelew" disabled={transactions?.accounts?.length < 2} />
                    </Tabs>
                }

                {(type === 0 && transactions?.accounts[0] && transactions?.categories[0]) || (type === 1 && transactions?.accounts[0] && transactions?.accounts[1]) ?
                    <>
                        {title}
                        <DialogContent>
                            {transactions &&
                                <form onSubmit={handleTransaction}>
                                    <TextField
                                        margin="normal"
                                        variant="outlined"
                                        label="Komentarz"
                                        name="comment"
                                        multiline
                                        autoFocus
                                        value={comment}
                                        onChange={event => setComment(event.target.value)}
                                    />
                                    <div className="one-line">
                                        <div className="line-element">
                                            <TextField
                                                margin="normal"
                                                variant="outlined"
                                                name="amount"
                                                label="Podaj kwotę"
                                                error={amountZero}
                                                value={amount}
                                                onBlur={event => balanceController(event.target.value)}
                                                onChange={event => setAmount(event.target.value)}
                                            />
                                        </div>
                                        <div className="line-element">
                                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    inputVariant="outlined"
                                                    label="Wybierz datę"
                                                    format="yyyy-MM-dd"
                                                    okLabel="Ok"
                                                    clearLabel="Wyczyść"
                                                    cancelLabel="Anuluj"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </div>
                                    </div>
                                    {type === 0 ?
                                        <div className="one-line">
                                            {accountsList() && selectedAccount > 0 &&
                                                <div className="line-element">
                                                    <FormControl variant="outlined">
                                                        <InputLabel>Konta</InputLabel>
                                                        <Select
                                                            required
                                                            value={selectedAccount}
                                                            onChange={handleChangeAccount}
                                                        >
                                                            {accountsList().map((item: Account) => {
                                                                if (!item.archived) {
                                                                    return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                                                } 
                                                                return <MenuItem className="hidden" key={item.id} value={item.id}>{item.name}</MenuItem>
                                                            }
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            }
                                            {categoriesList() && selectedCategory > 0 &&
                                                <div className="line-element">
                                                    <FormControl variant="outlined">
                                                        <InputLabel>Kategorie</InputLabel>
                                                        <Select
                                                            required
                                                            value={selectedCategory}
                                                            onChange={handleChangeCategory}
                                                        >
                                                            {categoriesList().map((item: Category) => {
                                                                if (!item.archived) {
                                                                    return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                                                } 
                                                                return <MenuItem className="hidden" key={item.id} value={item.id}>{item.name}</MenuItem>
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            }
                                        </div>
                                        :
                                        <div className="one-line">
                                            {accountsList() && fromAccount > 0 &&
                                                <div className="line-element">
                                                    <FormControl variant="outlined" error={sameAccountsError}>
                                                        <InputLabel>Z konta</InputLabel>
                                                        <Select
                                                            required
                                                            value={fromAccount}
                                                            onChange={handleChangeFromAccount}
                                                        >
                                                            {accountsList().map((item: Account) => {
                                                                if (!item.archived) {
                                                                    return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                                                } 
                                                                return <MenuItem className="hidden" key={item.id} value={item.id}>{item.name}</MenuItem>
                                                            }
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            }
                                            {accountsList() && toAccount > 0 &&
                                                <div className="line-element">
                                                    <FormControl variant="outlined" error={sameAccountsError}>
                                                        <InputLabel>Na konto</InputLabel>
                                                        <Select
                                                            required
                                                            value={toAccount}
                                                            onChange={handleChangeToAccount}
                                                        >
                                                            {accountsList().map((item: Account) => {
                                                                if (!item.archived) {
                                                                    return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                                                } 
                                                                return <MenuItem className="hidden" key={item.id} value={item.id}>{item.name}</MenuItem>
                                                            }
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            }
                                        </div>
                                    }

                                    <div className="btn-section">
                                        {submit}
                                        {editModalType && <Button className="btn-delete" type="button" variant="contained" color="secondary" onClick={() => deleteTransaction()}>Usuń transakcję</Button>}
                                    </div>
                                </form>
                            }
                        </DialogContent> 

                    </> 
                    : 
                    <Alert severity="warning" variant="outlined" className="alert-msg">
                        <span>Nie można dodać nowej transakcji, nie znaleziono {!transactions?.accounts[0] && transactions?.categories[0] && 'kont.'}
                            {!transactions?.categories[0] && transactions?.accounts[0] && 'kategorii.'}
                            {!transactions?.categories[0] && !transactions?.accounts[0] && 'kont oraz kategorii.'}
                        </span>
                    </Alert>
                }
                    
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

export default TransactionDialog
