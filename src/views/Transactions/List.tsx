import React, { FC, useEffect, useContext, useState, useImperativeHandle } from 'react'
import { Paper, Icon, CardActionArea } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { GlobalContext } from '../../context/GlobalContext'

const TransactionsList: FC<any> = ({ forwardRef, editTransaction }) => {
    const { DISPATCH, convertMonths } = useContext(GlobalContext)
    const [transactions, setTransactions] = useState<any>(null)
    const [downloaded, setDownloaded] = useState(false)

    const getTransactions = async () => {
        const response = await DISPATCH('get', '/transactions')
        
        if (response !== null) { 
            setTransactions(response) 
            setDownloaded(true)
        }
    }

    useImperativeHandle(forwardRef, () => {
        return {
            getTransactions,
        }
    })

    useEffect(() => {
        getTransactions()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="transaction-list">
            <div>
                {transactions?.data.length ? (
                    <ul className="list">
                        {transactions.data.map((date: any, index: number) => (
                            <Paper key={index}>
                                <div className="head">
                                    <div className="date">
                                        <div className="day">{date.day}</div>
                                        <div className="month-year">
                                            {convertMonths(date.month)} {date.year}
                                        </div>
                                    </div>
                                    <div className="amount">
                                        {date.totalEffectiveAmount > 0 && <span className="plus">+{date.totalEffectiveAmount} zł</span>}
                                        {date.totalEffectiveAmount < 0 && <span className="minus">{date.totalEffectiveAmount} zł</span>}
                                        {date.totalEffectiveAmount === 0 && <span>{date.totalEffectiveAmount} zł</span>}
                                    </div>
                                </div>
                                <ul className="transactions">
                                    {date.transactions.map((transaction: any) => (
                                        <CardActionArea key={transaction.id} onClick={() => editTransaction(transaction)}>
                                            <li>
                                                {transaction.type === 'EXTERNAL_TRANSACTION' ?
                                                    <>
                                                        <div className="icon">
                                                            <div className="inner-icon"
                                                                style={{
                                                                    backgroundColor: transaction.category.color || '#2196f3',
                                                                }}
                                                            >
                                                                <Icon>{transaction.category.iconName}</Icon>
                                                            </div>
                                                        </div>
                                                
                                                        <div className="detail">
                                                            <div className="info">
                                                                <span className="category">{transaction.category.name}</span>
                                                                <div className="account">
                                                                    <Icon>{transaction.account.iconName}</Icon>
                                                                    <span className="name">{transaction.account.name}</span>
                                                                </div>
                                                            </div>
                                                            <div className="comment">{transaction.comment}</div>
                                                        </div>
                                                        <div className="amount">
                                                            {transaction.effectiveAmount > 0 ?
                                                                <span className="plus">+{transaction.effectiveAmount} zł</span>
                                                                :
                                                                <span className="minus">{transaction.effectiveAmount} zł</span>
                                                            }
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="detail">
                                                            <div className="info transfer">
                                                                <div className="icons">
                                                                    <Icon>subdirectory_arrow_right</Icon>
                                                                    <Icon>subdirectory_arrow_right</Icon>
                                                                </div>
                                                                <div>
                                                                    <div className="account">
                                                                        <Icon>{transaction.sourceAccount.iconName}</Icon>
                                                                        <span className="name">{transaction.sourceAccount.name}</span>
                                                                    </div>
                                                                    <div className="account">
                                                                        <Icon>{transaction.destinationAccount.iconName}</Icon>
                                                                        <span className="name">{transaction.destinationAccount.name}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="comment">{transaction.comment}</div>
                                                        </div>
                                                        <div className="amount">
                                                            <span>{transaction.amount} zł</span>
                                                        </div>
                                                    </>
                                                }
                                            </li>
                                        </CardActionArea>
                                    ))}
                                </ul>
                            </Paper>
                        ))}
                    </ul>
                ) : (
                    downloaded && <Paper className="alert-msg"><Alert severity="warning" variant="outlined"><span>Lista transakcji jest pusta</span></Alert></Paper>
                )}
            </div>
        </div>
    )
}

export default TransactionsList
