import React, { useContext, useState, FC, ChangeEvent, useEffect, useImperativeHandle } from 'react'
import { Tab, Paper, Tabs, Icon, CardActionArea } from '@material-ui/core'
import { ViewModule, TrendingDown, TrendingUp } from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalContext'
import { Category } from '../../interfaces'

const CategoriesList: FC<any> = ({ forwardRef }) => {
    const { DISPATCH } = useContext(GlobalContext)

    const [currentTab, setCurrentTab] = useState(1)
    const [categoriesList, setCategoriesList] = useState([])
    const [filtredCategoriesList, setFiltredCategoriesList] = useState([])
    const [downloaded, setDownloaded] = useState(false)

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue)
        filter(newValue)
    }

    const filter = (tabIndex: number) => {
        if (tabIndex === 0) {
            const filtred = categoriesList.filter(
                (item: Category) => item.type === 'EXPENSE'
            )
            setFiltredCategoriesList(filtred)
        }
        if (tabIndex === 1) {
            setFiltredCategoriesList(categoriesList)
        }
        if (tabIndex === 2) {
            const filtred = categoriesList.filter(
                (item: Category) => item.type === 'PROCEEDS'
            )
            setFiltredCategoriesList(filtred)
        }
    }

    useImperativeHandle(forwardRef, () => {
        return {
            getCategoriesList,
        }
    })
    
    const getCategoriesList = async () => {
        const response = await DISPATCH('get', '/categories')
        
        if (response !== null) { 
            setCategoriesList(response)
            setDownloaded(true) 
        }
    }

    useEffect(() => {
        getCategoriesList()
    // eslint-disable-next-line
  }, [])
    useEffect(() => {
        filter(1)
    // eslint-disable-next-line
  }, [categoriesList])

    return (
        <div className="list-wrapper">
            <Paper square>
                <Tabs
                    value={currentTab}
                    onChange={handleChangeTab}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="icon label tabs example"
                >
                    <Tab icon={<TrendingDown />} label="Wydatki" />
                    <Tab icon={<ViewModule />} label="Wszystkie" />
                    <Tab icon={<TrendingUp />} label="Przychody" />
                </Tabs>
            </Paper>
            {filtredCategoriesList?.length ? (
                <div className="list">
                    {filtredCategoriesList.map((item: any) => {
                        return (
                            <div className="item" key={item.id}>
                                <Link to={`/categories/${item.id}`}>
                                    <CardActionArea>
                                        <Paper square>
                                            <div
                                                className={
                                                    item.archived ? 'archived inner-item' : 'inner-item'
                                                }
                                            >
                                                <div className="icon-wrapper">
                                                    <div
                                                        className="icon"
                                                        style={{
                                                            backgroundColor: item.color || '#2196f3',
                                                        }}
                                                    >
                                                        <Icon>{item.iconName}</Icon>
                                                    </div>
                                                </div>
                                                <div className="name">{item.name}</div>
                                                <div className="amount">
                                                    {item.amountForCurrentMonth} zł
                                                </div>
                                            </div>
                                        </Paper>
                                    </CardActionArea>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            ) : 
                downloaded && <Paper className="alert-msg"><Alert severity="warning" variant="outlined"><span>Lista kategorii jest pusta</span></Alert></Paper>
            }
        </div>
    )
}

export default CategoriesList
