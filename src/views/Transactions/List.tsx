import React, { FC, useEffect, useContext, useState, useImperativeHandle } from 'react'
import { Paper, CardActionArea, Icon, Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import plLocale from 'date-fns/locale/pl';
import { GlobalContext } from '../../context/GlobalContext'
import TransactionsListElement from './ListElement'

const TransactionsList: FC<any> = ({ forwardRef, editTransaction }) => {
    const { DISPATCH, convertMonths, prettyPrice } = useContext(GlobalContext)
    const [transactions, setTransactions] = useState<any>(null)
    const [getting, setGetting] = useState(true)
    const [selectedDate, setSelectedDate] = useState<string>('')
    const [datepickerVisibility, setDatepickerVisibility] = useState(false)
    const [currentDate, setCurrentDate] = useState({ year: 0, month: 0 })

    const getTransactions = async () => {
        const response = await DISPATCH('get', '/transactions')
        
        if (response !== null) { 
            setTransactions(response) 
        }
        setGetting(false)
        getCurrentDate(new Date(), false)
    }

    const getFiltredTransactions = async (year: string, month: string) => {
        const response = await DISPATCH('get', `/transactions?year=${year}&month=${month}`)
        
        if (response !== null) { 
            setTransactions(response) 
        }
    }

    const handleDateChange = (date: any) => {
        getCurrentDate(date, true)
    }

    const getCurrentDate = (date: any, update: boolean) => {
        const year = date.getFullYear()
        const month = date.getMonth() + 1

        const format = `${year}-${month < 10 ? `0${month}` : month}`
        setSelectedDate(format)
        setCurrentDate({ year, month })
        if (update) {
            getFiltredTransactions(year, month)
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

    const startBalance = () => transactions.startBalance
    const endBalance = () => transactions.endBalance

    return (
        <>
            {!getting &&
                <div className="transaction-list">
                    <div className="filters">
                        <div className="hidden-datepicker">
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
                                <KeyboardDatePicker
                                    format="yyyy-MM"
                                    okLabel="Ok"
                                    clearLabel="Wyczyść"
                                    cancelLabel="Anuluj"
                                    onClose={() => setDatepickerVisibility(false)}
                                    value={selectedDate}
                                    open={datepickerVisibility}
                                    animateYearScrolling={true}
                                    onChange={handleDateChange}
                                    views={['month']}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="date-filter">
                            <div className="balance-from">
                                <span className="label">Saldo początkowe</span>
                                <span className="value">
                                    {startBalance() > 0 && <span className="plus">{prettyPrice(startBalance())} zł</span>}
                                    {startBalance() < 0 && <span className="minus">{prettyPrice(startBalance())} zł</span>}
                                    {startBalance() === 0 && <span>{prettyPrice(startBalance())} zł</span>}
                                </span>
                            </div>
                            <div className="from">{transactions.period.from}</div>
                            <Button variant="outlined" color="primary" type="button" onClick={() => setDatepickerVisibility(true)}>{convertMonths(currentDate.month, 1)} {currentDate.year} <Icon>event</Icon></Button>
                            <div className="to">{transactions.period.to}</div>
                            <div className="balance-to">
                                <span className="label">Saldo końcowe</span>
                                <span className="value">
                                    {endBalance() > 0 && <span className="plus">{prettyPrice(endBalance())} zł</span>}
                                    {endBalance() < 0 && <span className="minus">{prettyPrice(endBalance())} zł</span>}
                                    {endBalance() === 0 && <span>{prettyPrice(endBalance())} zł</span>}
                                </span>
                            </div>
                        </div>
                    </div>
                    {transactions?.data.length ? (
                        <ul className="list">
                            {transactions.data.map((date: any, index: number) => (
                                <Paper key={index}>
                                    <div className="head">
                                        <div className="date">
                                            <div className="day">{date.day}</div>
                                            <div className="month-year">
                                                {convertMonths(date.month, 0)} {date.year}
                                            </div>
                                        </div>
                                        <div className="amount">
                                            {date.totalEffectiveAmount > 0 && <span className="plus">+{prettyPrice(date.totalEffectiveAmount)} zł</span>}
                                            {date.totalEffectiveAmount < 0 && <span className="minus">{prettyPrice(date.totalEffectiveAmount)} zł</span>}
                                            {date.totalEffectiveAmount === 0 && <span>{prettyPrice(date.totalEffectiveAmount)} zł</span>}
                                        </div>
                                    </div>
                                    <ul className="transactions-item-list">
                                        {date.transactions.map((transaction: any) => (
                                            <CardActionArea key={transaction.id} onClick={() => editTransaction(transaction)}>
                                                <TransactionsListElement transaction={transaction} />
                                            </CardActionArea>
                                        ))}
                                    </ul>
                                </Paper>
                            ))}
                        </ul>
                    ) : (
                        <Paper className="alert-msg"><Alert severity="info" variant="outlined"><span>Lista transakcji jest pusta</span></Alert></Paper>
                    )}
                </div>
            }
        </>
    )
}

export default TransactionsList
