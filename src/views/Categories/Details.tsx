import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { TextField, Button, FormControlLabel, IconButton, Paper, Switch, DialogContentText, Icon, Checkbox, Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { GlobalContext } from '../../context/GlobalContext'
import TransactionsListElement from '../Transactions/ListElement'

const CategoriesDetails: React.FC<any> = () => {
    const { DISPATCH, showSnackbar, convertMonths, categoryIconList, colors } = useContext(GlobalContext)

    const [details, setDetails] = useState<any>(null)
    const [archived, setArchived] = useState(false)
    const [color, setColor] = useState('')
    const [iconName, setIconName] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [open, setOpen] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [getting, setGetting] = useState(true)
    const [transactions, setTransactions] = useState([])

    const { id } = useParams()
    const history = useHistory()

    const deleteCategory = async () => {
        const response = await DISPATCH('delete', `/categories/${id}`)
        if (response !== null) {
            showSnackbar('Kategoria została usunięta')
            history.push('/categories')
        } else {
            showSnackbar('Błąd usuwania kategorii')
        }
        setOpen(false)
    }

    const getDetails = async () => {
        const response = await DISPATCH('get', `/categories/${id}`)
        if (response !== null) {
            setDetails(response)
            setArchived(response.archived)
            setColor(response.color)
            setIconName(response.iconName)
            setName(response.name)
            setType(response.type)
            setTransactions(response.transactions)
            
            document.title = `Money Manager - kategoria - ${response.name}`
        } else {
            showSnackbar('Błąd pobierania danych')
            setHasError(true)
        }
        
        setGetting(false)
    }

    const watchChanges = () => {
        if (details) {
            if (
                details.archived !== archived ||
                details.color !== color ||
                details.iconName !== iconName ||
                details.name !== name ||
                details.type !== type
            ) {
                return true
            }
        }
        return false
    }

    const updateCategory = async () => {
        const response = await DISPATCH('put', `/categories/${id}`, { name, type, iconName, color, archived })
        if (response !== null) {
            showSnackbar('Poprawnie zmieniono dane')
            getDetails()
        } else {
            showSnackbar('Błąd edycji')
        }
    }
    const handleCloseDialog = (answer: boolean) => {
        if (answer) {
            deleteCategory()
        }
        setOpen(false)
    }

    const handleChangeType = () => {
        if (type === 'EXPENSE') {
            setType('PROCEEDS')
        } else {
            setType('EXPENSE')
        }
    }

    useEffect(() => {
        getDetails()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {!getting &&
                <div className="module-categories">
                    {details?.id ? (
                        <>
                            <Paper className="categories-details">
                                <div className="edit-data">
                                    <div className="header">
                                        <div className="title">Edycja kategorii</div>
                                    </div>
                                    <TextField
                                        margin="normal"
                                        variant="outlined"
                                        required
                                        className="name-field"
                                        label="Nazwa"
                                        name="add-acc-name"
                                        autoFocus
                                        value={name}
                                        onChange={event => setName(event.target.value)}
                                    />
                                    <FormControlLabel
                                        className="archive"
                                        control={
                                            <Checkbox
                                                checked={archived}
                                                onChange={event => setArchived(!archived)}
                                                color="primary"
                                            />
                                        }
                                        label="Archiwizuj kategorie"
                                    />
                                    <FormControlLabel
                                        control={<Switch onChange={handleChangeType} color="default" />}
                                        label={type === 'EXPENSE' ? 'Wydatki' : 'Przychody'}
                                    />
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
                                    <div className="choose-icon">
                                        <span>Wybierz ikonę</span>
                                        {categoryIconList.map((item, index) => (
                                            <div key={index} className="icon">
                                                {item === iconName ? (
                                                    <IconButton color="secondary" disabled>
                                                        <Icon>{item}</Icon>
                                                    </IconButton>
                                                ) : (
                                                    <IconButton onClick={() => setIconName(item)}>
                                                        <Icon>{item}</Icon>
                                                    </IconButton>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="footer">
                                        <Link to="/categories">
                                            <Button variant="outlined">Wróć</Button>
                                        </Link>
                                        <div>
                                            {watchChanges() && <Button variant="contained" color="primary" className="save" onClick={() => updateCategory()}>Zapisz zamiany</Button>}
                                            <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>Usuń</Button>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                            <div className="transaction-in-category">
                                <div className="transaction-list">
                                    {transactions?.length ? (
                                        <ul className="list">
                                            {transactions.map((date: any, index: number) => (
                                                <Paper key={index}>
                                                    <div className="head">
                                                        <div className="date">
                                                            <div className="day">{date.day}</div>
                                                            <div className="month-year">
                                                                {convertMonths(date.month, 0)} {date.year}
                                                            </div>
                                                        </div>
                                                        <div className="amount">
                                                            {date.totalEffectiveAmount > 0 && <span className="plus">+{date.totalEffectiveAmount} zł</span>}
                                                            {date.totalEffectiveAmount < 0 && <span className="minus">{date.totalEffectiveAmount} zł</span>}
                                                            {date.totalEffectiveAmount === 0 && <span>{date.totalEffectiveAmount} zł</span>}
                                                        </div>
                                                    </div>
                                                    <ul className="transactions-item-list">
                                                        {date.transactions.map((transaction: any) => (
                                                            <TransactionsListElement transaction={transaction} key={transaction.id} />
                                                        ))}
                                                    </ul>
                                                </Paper>
                                            ))}
                                        </ul>
                                    ) : (
                                        <Paper className="alert-msg"><Alert severity="info" variant="outlined"><span>Lista transakcji jest pusta</span></Alert></Paper>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <Paper className="alert-msg"><Alert severity="error" variant="outlined"><span>{hasError && 'Kategoria o podanym ID nie została znaleziona.'}</span></Alert></Paper>
                    )}
                    <Dialog open={open} onClose={() => handleCloseDialog(false)}>
                        <DialogTitle>Usuwanie kategorii</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Czy jesteś pewien, że chcesz usunąć tą kategorię? Spowoduje to utratę wszystkich transakcji, które ją zawierają.<br /> Do ukrycia kategorii służy funkcja archiwizacji.</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleCloseDialog(false)} color="primary">Anuluj</Button>
                            <Button onClick={() => handleCloseDialog(true)} color="secondary" autoFocus>Usuń</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            }
        </>
    )
}

export default CategoriesDetails
