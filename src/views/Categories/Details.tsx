import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { TextField, Button, FormControlLabel, IconButton, Paper, Switch, DialogContentText, Icon, Checkbox, Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core'
import { GlobalContext } from '../../context/GlobalContext'

const CategoriesDetails: React.FC<any> = () => {
    const { DISPATCH, showSnackbar } = useContext(GlobalContext)

    const [details, setDetails] = useState<any>(null)
    const [archived, setArchived] = useState(false)
    const [color, setColor] = useState('')
    const [iconName, setIconName] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [open, setOpen] = useState(false)
    const [hasError, setHasError] = useState(false)

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
        } else {
            showSnackbar('Błąd pobierania danych')
            setHasError(true)
        }
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

    const iconList: string[] = [
        'category',
        'shopping_basket',
        'restaurant',
        'theaters',
        'directions_bus',
        'card_giftcard',
        'local_mall',
        'spa',
        'face',
        'work_outline',
    ]

    const colors: string[] = [
        '#f44336',
        '#e91e63',
        '#9c27b0',
        '#673ab7',
        '#5c6bc0',
        '#2196f3',
        '#03a9f4',
        '#00bcd4',
        '#009688',
        '#4caf50',
        '#8bc34a',
        '#cddc39',
        '#ffeb3b',
        '#ffc107',
        '#ff9800',
        '#ff5722',
        '#795548',
        '#9e9e9e',
        '#607d8b',
    ]

    return (
        <div className="module-categories">
            {details?.id ? (
                <Paper className="categories-details">
                    <div className="edit-data">
                        <div className="header">
                            <div className="title">Edycja kategorii</div>
                            {/* <div className="amount">{amountForCurrentMonth} PLN</div> */}
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
                            {iconList.map((item, index) => (
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
            ) : (
                <div className="list-is-empty">
                    {hasError && 'Kategoria o podanym ID nie została znaleziona.'}
                </div>
            )}
            <Dialog open={open} onClose={() => handleCloseDialog(false)}>
                <DialogTitle>Usuwanie kategorii</DialogTitle>
                <DialogContent>
                    <DialogContentText>Czy jesteś pewnien że chcesz usunąć tą kategorię?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseDialog(false)} color="primary">Anuluj</Button>
                    <Button onClick={() => handleCloseDialog(true)} color="secondary" autoFocus>Usuń</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CategoriesDetails
