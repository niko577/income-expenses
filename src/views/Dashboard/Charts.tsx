import React, { useEffect } from 'react'
import Chart from 'chart.js'

const DashboardCharts: React.FC<any> = ({ id, data }) => {
    const initCharts = () => {
        const ctx: any = document.getElementById(id)
        const diagramData = {
            labels: data.labels,
            datasets: data.datasets
        }
        console.log(diagramData);

        // eslint-disable-next-line
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: diagramData,
            options: {
                tooltips: {
                    displayColors: true,
                    callbacks: {
                        label(tooltipItem: any, dataEl: any) {
                            let label: any = dataEl.datasets[tooltipItem.datasetIndex].label || '';
        
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
        if (data) {
            initCharts()
        }
        // eslint-disable-next-line
    }, [data])

    return (
        <div className="single-chart">
            <h2>{id === 'chart-expense' ? 'Wydatki z obecnego miesiąca' : 'Przychody z obecnego miesiąca'}</h2>
            <canvas id={id} height="250" />
        </div>
    )
}

export default DashboardCharts
