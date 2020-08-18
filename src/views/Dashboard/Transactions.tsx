import React, { FC, useEffect, useState } from 'react'
import { Paper } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import TransactionsListElement from '../Transactions/ListElement'

const DashboardTransactions: FC<any> = ({ data }) => {
    const [sliced, setSliced] = useState([])
    const [getting, setGetting] = useState(true)

    useEffect(() => {
        if (data) {
            setSliced(data.lastTransactions.slice(0, 6))
            setGetting(false)
        }
    }, [data])
    
    return (
        <>
            {!getting &&
                <div className="card-transactions">
                    <h2>Ostatnie transakcje</h2>
                    <div className="transactions-item-list">
                        {sliced.map((transaction: any, index: number) => <TransactionsListElement key={index} transaction={transaction} />)}
                        {!getting && !sliced.length && <Paper className="alert-msg"><Alert severity="info" variant="outlined"><span>Brak transakcji</span></Alert></Paper>}
                    </div>
                </div>
            }
        </>
    )
}

export default DashboardTransactions
