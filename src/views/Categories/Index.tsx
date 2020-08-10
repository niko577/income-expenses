import React, { FC, useRef, useEffect } from 'react'
import List from './List'
import Dialog from './Dialog'

const Categories: FC<any> = () => {
    const dialogRef: any = useRef(null)
    const listRef: any = useRef(null)

    const updateList = () => {
        listRef.current.getCategoriesList()
    }

    useEffect(() => {
        document.title = 'Money Manager - Kategorie'
    }, [])

    return (
        <div className="module-categories">
            <Dialog forwardRef={dialogRef} updateList={updateList} />
            <List forwardRef={listRef} />
        </div>
    )
}

export default Categories
