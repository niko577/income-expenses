import React, { FC, useEffect, useState, useContext } from 'react'
import { Icon, Paper } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { GlobalContext } from '../../context/GlobalContext'

const DashboardCategories: FC<any> = ({ data }) => {
    const { prettyPrice } = useContext(GlobalContext)
    const [sliced, setSliced] = useState([])
    const [getting, setGetting] = useState(true)

    useEffect(() => {
        if (data) {
            setSliced(data.categoriesStats.slice(0, 6))
            setGetting(false)
        }
    }, [data])

    return (
        <>
            {!getting &&
                <div className="card-categories">
                    <h2>Statystyki wydatków</h2>
                    <div className="category-list">
                        {sliced.map((item: any, index: number) => 
                            <div className="single-category" key={index}>
                                <div className="icon-wrapper">
                                    <div className="icon" style={{ backgroundColor: item.category.color }}>
                                        <Icon>{item.category.iconName}</Icon>
                                    </div>
                                </div>
                                <div className="info-wrapper">
                                    <div className="topbar">
                                        <div className="name">{item.category.name}</div>
                                        <div className="amount">{prettyPrice(item.amount)} zł</div>
                                    </div>
                                    <div className="progressbar">
                                        <ProgressBar data={{ percent: item.percent, color: item.category.color }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
            {!getting && !sliced.length && <Paper className="alert-msg"><Alert severity="info" variant="outlined"><span>Brak kategorii</span></Alert></Paper>}
        </>
    )
}

const ProgressBar: FC<any> = ({ data }) => {
    const [percent, setPercent] = useState(0)
    const [label, setLabel] = useState(0)

    const animateLabel = () => {
        let index = 0
        const inter = setInterval(() => {
            if (index <= data.percent) {
                setLabel(index)
                index +=1
            } else {
                clearInterval(inter)
            }
        }, 800 / data.percent)
    }

    useEffect(() => {
        setTimeout(() => {
            animateLabel()
            setPercent(data.percent)
        }, 150)
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="down" />
            <div className="up" style={{ width: `${percent}%`, backgroundColor: data.color }} />
            <div className="percent-wrapper">
                <div className="percent" style={{ left: `${percent}%`, color: data.color }}>{`${label}%`}</div>
            </div>
        </>
    )
}

export default DashboardCategories
