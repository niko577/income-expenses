import React, { FC, useRef, useEffect } from 'react'
import List from './List'
import Dialog from './Dialog'
import { Account } from '../../interfaces'

const Accounts: FC<any> = () => {
    const dialogRef: any = useRef(null)
    const listRef: any = useRef(null)

    const updateList = () => {
        listRef.current.getAccountsList()
    }
    const deleteAccount = (account: Account) => {
        dialogRef.current.deleteAccount(account)
    }

    useEffect(() => {
        document.title = 'Money Manager - Konta'
    }, [])

    return (
        <div className="module-accounts">
            <Dialog forwardRef={dialogRef} updateList={updateList} />
            <List forwardRef={listRef} deleteAccount={deleteAccount} />
        </div>
    )
}

export default Accounts
