import React, { FC } from 'react'
import { Paper, Icon, CardActionArea } from '@material-ui/core'
import Charts from './Charts'
import Categories from './Categories'
import Transactions from './Transactions'

const Dashboard: FC<any> = () => {
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
                        <Categories />
                    </Paper>
                </div>
                <div className="dash-element">
                    <Paper>
                        <Transactions />
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
