import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartStyle from './chart.module.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export function BarChart({budgetCount,chartCount}) {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                data: chartCount,
                backgroundColor: ['#1E783C', '#E1FBE9'],
                borderWidth: 0,
            },
        ],
    };

    const barOptions = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                display: false,
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    // const addchartdata = data.datasets[0].data.reduce((partialSum, a) => partialSum + a, 0);
    const addchartdata = budgetCount

    return (
        <>
            <div className={`${ChartStyle.chart_box}`}>
                <div className={`${ChartStyle.chartbox_hdng}`}>
                    <div className={`${ChartStyle.chartbox_hdng_left}`}>
                        <h4>Total Budget</h4>
                        <h2>{addchartdata} </h2>
                    </div>
                </div>
                <div className={`${ChartStyle.bar_chart}`}>
                    <Bar data={data} options={barOptions} />
                </div>
            </div>
        </>
    );
}