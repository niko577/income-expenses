import React, { useEffect } from 'react'
import Chart from 'chart.js'

const DashboardCharts: React.FC<any> = ({ id }) => {
    const initCharts = () => {
        const ctx: any = document.getElementById(id)
        let diagramData = {}

        if (id === 'chart-expense') {
            diagramData = {
                labels: ['1 cze', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
                datasets: [{
                    label: 'Artykuły spożywcze',
                    backgroundColor: '#03a9f4',
                    data: [0, 50, 0, 0, 23, 12, 0, 0, 0, 244, 0, 0, 0, 124, 0, 0, 0, 45, 0, 0, 45, 75, 33, 0, 6, 0, 0, 0, 0, 15],
                }, {
                    label: 'Restauracje',
                    backgroundColor: '#5765b5',
                    data: [0, 0, 52, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                }, {
                    label: 'Wypoczynek',
                    backgroundColor: '#e41d61',
                    data: [0, 0, 0, 59, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                }, {
                    label: 'Transport',
                    backgroundColor: '#ffc107',
                    data: [500, 0, 0, 0, 0, 0, 600, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 2.54, 0, 700, 0, 0, 0, 0, 2, 0, 1, 0],
                }, {
                    label: 'Prezenty',
                    backgroundColor: '#f65421',
                    data: [0, 0, 0, 0, 0, 0, 5.12, 85, 0, 0, 0, 0, 0, 600, 0, 0, 0, 0, 0, 1.22, 0, 0, 0, 50.23, 0, 0, 0, 0, 0, 0],
                }, {
                    label: 'Zakupy',
                    backgroundColor: '#785447',
                    data: [0, 0, 0, 0, 0, 55, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 4, 0, 0, 0, 63, 0, 0, 0, 345, 0, 0, 0, 0],
                }, {
                    label: 'Zdrowie',
                    backgroundColor: '#01b3ca',
                    data: [12, 42, 0, 0, 0, 53, 0, 0, 0, 0, 34, 0, 0, 0, 0, 756, 0, 0, 0, 0, 67, 0, 0, 0, 0, 5, 0, 33.4, 0, 23],
                }, {
                    label: 'Rodzina',
                    backgroundColor: '#6539b4',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 755, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                }],
            }
        } else {
            diagramData = {
                labels: ['1 cze', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30 cze'],
                datasets: [{
                    label: 'Wynagrodzenie',
                    backgroundColor: '#009688',
                    data: [0, 50, 0, 0, 23, 12, 0, 0, 0, 244, 0, 0, 0, 124, 0, 0, 0, 45, 0, 0, 45, 75, 33, 0, 6, 0, 0, 0, 0, 15],
                }],
            }
        }

        // eslint-disable-next-line
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: diagramData,
            options: {
                tooltips: {
                    displayColors: true,
                    callbacks: {
                        label(tooltipItem: any, data: any) {
                            let label: any = data.datasets[tooltipItem.datasetIndex].label || '';
        
                            if (label) {
                                label += ': ';
                            }
                            label += `${Math.round(tooltipItem.yLabel * 100) / 100  } zł`;
                            return label;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10,
                            maxRotation: 0
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            beginAtZero: true,
                            callback(value, index, values) {
                                return `${value} zł`;
                            }
                        },
                        type: 'linear',
                    }]
                },
                responsive: true,
                maintainAspectRatio: false,
                responsiveAnimationDuration: 800,
                legend: { position: 'bottom' },
            }
        });
        
    }

    useEffect(() => {
        initCharts()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="single-chart">
            <h2>{id === 'chart-expense' ? 'Wydatki z obecnego miesiąca' : 'Przychody z obecnego miesiąca'}</h2>
            <canvas id={id} height="250" />
        </div>
    )
}

export default DashboardCharts
