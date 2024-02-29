import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartStyle from './chart.module.css'
import { CircleFill } from 'react-bootstrap-icons';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ accountCount }) {


    const activeAccounts = accountCount !== undefined && accountCount.Active;
    const inactiveAccounts = accountCount !== undefined && accountCount.InActive;

    const addchartdata = (accountCount.Active !== undefined ? accountCount.Active : 0) + (accountCount.InActive !== undefined ? accountCount.InActive : 0);
    const data = {
        labels: ['Active Accounts', 'InActive Accounts'],
        datasets: [
            {
                data: [activeAccounts, inactiveAccounts],
                backgroundColor: ['#1E783C', '#E1FBE9'],
                borderWidth: 0,
            },
        ],
    };

    const doughnutOptions = {
        plugins: {
            legend: {
                display: false,
            },
        },
        cutout: 75,
    };
    const labels = data.labels;
    const datasets = data.datasets;


    return (
        <>
            <div className={`${ChartStyle.chart_box}`}>
                <div className={`${ChartStyle.chartbox_hdng}`}>
                    <div className={`${ChartStyle.chartbox_hdng_left}`}>
                        <h4>Total Admin Account</h4>
                        <h2>{addchartdata}</h2>
                    </div>
                </div>
                <div className={`${ChartStyle.chart_data}`}>
                    <div className={`${ChartStyle.chartbox_lables}`}>
                        <p><CircleFill /> {labels[0]}: <span>{activeAccounts}</span></p>
                        <p><CircleFill /> {labels[1]}: <span>{inactiveAccounts}</span></p>
                    </div>
                    <div className={`${ChartStyle.doughnut_chart}`}>
                        <Doughnut data={data} options={doughnutOptions} />
                    </div>
                </div>
            </div>
        </>
    );
}

