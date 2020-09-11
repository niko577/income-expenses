import React, { FC, useEffect, useState, useContext } from 'react'
import { Paper } from '@material-ui/core'
import Charts from './Charts'
import Categories from './Categories'
import Transactions from './Transactions'
import { GlobalContext } from '../../context/GlobalContext'

const Dashboard: FC<any> = () => {
    const { DISPATCH } = useContext(GlobalContext)
    const [data, setData] = useState<any>(null)
    const [getting, setGetting] = useState(true)

    const getData = async () => {
        const response = await DISPATCH('get', '/dashboard')
        if (response !== null) { 
            setData(response) 
            setGetting(false)
        }
    }

    useEffect(() => {
        document.title = 'Money Manager - Strona główna'
        getData()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {!getting &&
                <div className="module-dashboard">
                    <div className="items-wrapper">
                        <div className="dash-element">
                            <Paper>
                                {data?.expensesDiagramData && <Charts id="chart-expense" data={data.expensesDiagramData} />}
                            </Paper>
                        </div>
                        <div className="dash-element">
                            <Paper>
                                {data?.proceedsDiagramData && <Charts id="chart-proceed" data={data.proceedsDiagramData} />}
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
            }
        </>
    )
}

export default Dashboard
