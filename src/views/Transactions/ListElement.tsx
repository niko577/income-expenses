import React, { FC, useState, useEffect, useContext } from 'react'
import { Icon } from '@material-ui/core'
import { GlobalContext } from '../../context/GlobalContext'

const TransactionsListElement: FC<any> = ({ transaction }) => {
    const { prettyPrice } = useContext(GlobalContext)
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        console.log(transaction);
        setTimeout(() => {
            setAnimate(true)
        }, 1)
    }, [])

    return (
        <li>
            {transaction.type === 'EXTERNAL_TRANSACTION' ?
                <>
                    <div className="icon">
                        <div
                            className={`inner-icon ${animate ? 'active' : ''}`}
                            style={{
                                backgroundColor: transaction.category.color || '#2196f3'
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
                    {transaction.effectiveAmount &&
                        <div className="amount">
                            {transaction.effectiveAmount > 0 ?
                                <span className="plus">+{prettyPrice(transaction.effectiveAmount)} zł</span>
                                :
                                <span className="minus">{prettyPrice(transaction.effectiveAmount)} zł</span>
                            }
                        </div>
                    }
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
                        <span>{prettyPrice(transaction.amount)} zł</span>
                    </div>
                </>
            }
        </li>
    )
}

export default TransactionsListElement
