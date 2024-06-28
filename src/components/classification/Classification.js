import {useState} from "react";
import {Bar} from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import HelpClassification from "../Help/HelpClassification";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Classification() {
    const [response, setResponse] = useState([0, 0, 0, 0]);
    const [isLoading, setIsLoading] = useState(false);

    const click = () => {
        setIsLoading(true);
        let canvas = document.querySelector('.cornerstone-canvas');
        let ctx = canvas.getContext('2d');
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let body = {
            data: [...imageData.data],
            width: canvas.width,
            height: canvas.height
        };
        let jsonString = JSON.stringify(body);

        fetch('http://localhost:8000/oct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonString
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            setResponse(data.prediction);
            setIsLoading(false);
        });

    };

    const data = {
        labels: ['CSR', 'DR', 'MH', 'Normal'],
        datasets: [
            {
                label: '',
                data: response.map(value => value * 100),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgb(253,1,51)',
                    'rgb(253,1,51)',
                    'rgb(253,1,51)',
                    'rgb(253,1,51)',
                ],
                borderWidth: 1,
            }
        ]
    }

    const config = {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y', // Set the chart to be horizontal
            elements: {
                bar: {
                    borderWidth: 2,
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'Wahrscheinlichkeit der Klassen in Prozent',
                },
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                },
            },
        },
    };

    return (
        <div>
        <button className={"btn btn-outline-success"} onClick={click}>Classify</button>
        <HelpClassification />
        {isLoading ? (
            <div className={"spinner-border text-primary"} role={"status"}>
                <span className={"visually-hidden"}>Loading...</span>
            </div>
            ) : (
                <div>
                <Bar {...config} />
            </div>
        )}
    </div>
    )
}