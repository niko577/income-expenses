import React, { FC, useEffect, useState, useContext } from 'react'
import { Paper } from '@material-ui/core'
import Charts from './Charts'
import Categories from './Categories'
import Transactions from './Transactions'
import { GlobalContext } from '../../context/GlobalContext'

const Dashboard: FC<any> = () => {
    const { DISPATCH } = useContext(GlobalContext)
    const [data, setData] = useState(null)

    const getData = async () => {
        const response = await DISPATCH('get', '/dashboard')
        
        if (response !== null) { 
            setData(response) 
        }
    }

    useEffect(() => {
        document.title = 'Money Manager - Strona główna'
        getData()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="module-dashboard">
            <div className="items-wrapper">
                <div className="dash-element">
                    <Paper>
                        <Charts id="chart-expense" />
                    </Paper>
                </div>
                <div className="dash-element">
                    <Paper>
                        <Charts id="chart-proceed" />
                    </Paper>
                </div>
                <div className="dash-element">
                    <Paper>
                        <Categories data={data} />
                    </Paper>
                </div>
                <div className="dash-element">
                    <Paper>
                        <Transactions data={data} />
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
