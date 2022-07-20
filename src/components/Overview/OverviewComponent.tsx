import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Col, Row } from 'antd';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Overview',
        },
    },
};

const labels = ['Total dataset', 'Total campaign', 'Total banner'];

const OverviewComponent: React.FC = () => {
    const [totalDataset, setTotalDataSet] = useState<number>(0);
    const [totalCampaign, setTotalCampaign] = useState<number>(0);
    const [totalBanner, setTotalBanner] = useState<number>(0);
    const data = {
        labels,
        datasets: [
            {
                label: 'Total',
                data: [totalDataset, totalCampaign, totalBanner],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ],
    };
    useEffect(() => {
        setTotalDataSet(12);
        setTotalCampaign(35);
        setTotalBanner(22);
    }, [])
    return (
        <>
            <Row>
                <Col span={8} style={{ border: '1px solid', padding: '15px', textAlign: 'center' }}>
                    <h2>Total dataset</h2>
                    <h2>{totalDataset}</h2>
                </Col>
                <Col span={8} style={{ border: '1px solid', padding: '15px', textAlign: 'center' }}>
                    <h2>Total campaign</h2>
                    <h2>{totalCampaign}</h2>
                </Col>
                <Col span={8} style={{ border: '1px solid', padding: '15px', textAlign: 'center' }}>
                    <h2>Total banner</h2>
                    <h2>{totalBanner}</h2>
                </Col>
            </Row>
            <Bar options={options} data={data} style={{maxHeight: '70vh'}}/>
        </>
    )
}

export default OverviewComponent;