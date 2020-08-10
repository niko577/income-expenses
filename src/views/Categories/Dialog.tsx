import React, { FC, useState, useContext } from 'react'
import { TextField, Button, FormControlLabel, IconButton, Fab, Switch, Icon, Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core'
import { GlobalContext } from '../../context/GlobalContext'

const CategoryAdd: FC<any> = ({ updateList }) => {
    const { DISPATCH, colors, categoryIconList } = useContext(GlobalContext)

    const [name, setName] = useState('')
    const [type, setType] = useState('EXPENSE')
    const [iconName, setIconName] = useState('category')
    const [color, setColor] = useState('#03a9f4')
    const [archived, setArchived] = useState(false)
    const [dialogStatus, setDialogStatus] = useState(false)

    const handleAccount = async (event: React.FormEvent<any>) => {
        event.preventDefault()

        const response = await DISPATCH('post', '/categories', { name, type, iconName, color, archived })
        
        if (response !== null) { 
            updateList()
        }
        setDialogStatus(false)
    }

    const handleChangeType = () => {
        type === 'EXPENSE' ? setType('PROCEEDS') : setType('EXPENSE')
    }

    const showDialogAddNew = () => {
        setName('')
        setType('EXPENSE')
        setIconName('category')
        setColor('#03a9f4')
        setArchived(false)
        setDialogStatus(true)
    }

    return (
        <div className="dialog-category">
            <Dialog
                open={dialogStatus}
                onClose={() => setDialogStatus(false)}
                className="module-category-modal"
            >
                <DialogTitle>Dodaj nową kategorię</DialogTitle>

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
                            {categoryIconList.map((item: string, index: number) => (
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

                        <Button
                            className="btn-submit"
                            type="submit"
                            variant="contained"
                            color="primary"
                        >Dodaj kategorię
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

export default CategoryAdd
