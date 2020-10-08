import React, { FC, useEffect, useState, useImperativeHandle, useContext } from 'react'
import { Button, Dialog, DialogContent, DialogActions, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { GlobalContext } from '../../context/GlobalContext'
import Chart from 'chart.js'

const MonthlyResumeTransactions: FC<any> = ({ forwardRef }) => {
    const [dialogStatus, setDialogStatus] = useState(false)
    const [categoriesList, setCategoriesList] = useState<any>([])
    const { DISPATCH, prettyPrice } = useContext(GlobalContext)
    const [getting, setGetting] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [monthlyList, setMonthlyList] = useState<any>(null)
    const [chart, setChart] = useState<any>(null)

    useEffect(() => {
        // eslint-disable-next-line
        getCategoriesList()
    }, [])

    const initChart = () => {
        const ctx: any = document.getElementById('chart-monthly')
        let diagramData: any = {
            labels: [],
            datasets: [
                {
                    data: [],
                    label: '1',
                    borderColor: "#3e95cd",
                    fill: false
                }
            ]
        }
        
        // eslint-disable-next-line
        const myChart = new Chart(ctx, {
            type: 'line',
            data: diagramData,
            options: {
                legend: {
                    display: false
                }
            }
        })
        let w: any = window
        w.myChart = myChart

        getMonthyAmount(categoriesList[0].id)
    }

    const getCategoriesList = async () => {
        const response = await DISPATCH('get', '/categories')
        
        if (response !== null) {
            setCategoriesList(response)
            setSelectedCategory(response[0].id)
        }
        setGetting(false) 
    }

    const getMonthyAmount = async (id) => {
        let response: any = await DISPATCH('get', `/transactions/monthly/${id}`)
        let w: any = window
        if (response !== null) {
            let temp = {}
            let labels: any = []
            let datasets: any = []

            response.map((item: any) => {
                const date = new Date(item.date)
                labels.push(`${date.getFullYear()}-${date.getMonth() + 1}`)
                datasets.push(Math.abs(item.totalEffectiveAmount))
            })

            temp = {labels, datasets}
            setMonthlyList(temp)
            
            w.myChart.data.labels = labels
            w.myChart.data.datasets[0].data = datasets
        } else {
            let temp = {}
            let labels: any = []
            let datasets: any = []
            temp = {labels, datasets}
            setMonthlyList(temp)
            w.myChart.data.labels = ['']
            w.myChart.data.datasets[0].data = [0]
        }
        w.myChart.update()
    }

    const handleChangeCategory = (event) => {
        setSelectedCategory(event.target.value)
        getMonthyAmount(event.target.value)
    };

    useImperativeHandle(forwardRef, () => ({
        show() {
            setDialogStatus(true)
            setSelectedCategory(categoriesList[0].id)
            setTimeout(() => {
                initChart()
            }, 10)
        }
    }))

    return (
        <>
            <Dialog open={dialogStatus} onClose={() => setDialogStatus(false)} className="module-transaction-monthly">
                <DialogTitle>Sprawdź podsumowanie miesięczne dla wybranej kategorii</DialogTitle>
                <DialogContent>
                {!getting && categoriesList && categoriesList.length &&
                    <>
                        <FormControl variant="outlined">
                            <InputLabel>Kategorie</InputLabel>
                            <Select value={selectedCategory} onChange={handleChangeCategory}>
                                {categoriesList.map((item: any) => {
                                    return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </>
                }
                <div>
                    <canvas id="chart-monthly" width="400" height="200"></canvas>
                </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogStatus(false)} color="primary">Anuluj</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default MonthlyResumeTransactions
