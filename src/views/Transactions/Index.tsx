import React, { FC, useRef, useEffect } from 'react'
import List from './List'
import Dialog from './Dialog'
import { Transaction } from '../../interfaces'

const Transactions: FC<any> = () => {
    const dialogRef: any = useRef(null)
    const listRef: any = useRef(null)

    const updateList = () => {
        listRef.current.getTransactions()
    }
    const editTransaction = (transaction: Transaction) => {
        dialogRef.current.editTransaction(transaction)
    }

    useEffect(() => {
        document.title = 'Money Manager - Transakcje'
    }, [])

    return (
        <div className="module-transactions">
            <Dialog forwardRef={dialogRef} updateList={updateList} />
            <List forwardRef={listRef} editTransaction={editTransaction} />
        </div>
    )
}

export default Transactions
