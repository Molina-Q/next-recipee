"use client"
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register the necessary components
Chart.register(
    ArcElement,        // For pie and doughnut charts
    CategoryScale,     // For the x-axis
    LinearScale,       // For the y-axis
    BarElement,        // For bar charts
    Title,             // For the chart title
    Tooltip,           // For tooltips
    Legend,            // For the legend
    PointElement,      // For points in line charts
    LineElement,       // For line charts
    ChartDataLabels    // For data labels
);

const NutriChart = (dataset: any) => {

    const Calories = dataset.dataset.calories;
    const Carbs = dataset.dataset.totalNutrients.CHOCDF.quantity;
    const Protein = dataset.dataset.totalNutrients.PROCNT.quantity;

    const nutritionalData = {
        labels: [
            `Calories (${dataset.dataset.totalNutrients.ENERC_KCAL.unit})`,
            `Carbs (${dataset.dataset.totalNutrients.CHOCDF.unit})`,
            `Protein (${dataset.dataset.totalNutrients.PROCNT.unit})`
        ],
        datasets: [{
            label: 'Nutrition',
            data: [
                Calories,
                Carbs,
                Protein
            ],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)'
            ],
            borderWidth: 0,

        }],
    }

    const options = {
        plugins: {
            datalabels: {
                display: true,
                color: 'black',
                formatter: (value: number, context: any) => {
                    return `${value.toFixed(1)} ${context.chart.data.labels[context.dataIndex].split(' ')[1]}`;
                }
            }
        }
    };

    return (
        <Doughnut 
            data={nutritionalData}
            options={options} 
        />
    )
}

export default NutriChart