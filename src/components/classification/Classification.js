import {useState} from "react";
import {Bar} from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import HelpClassification from "../Help/HelpClassification";
import {useTranslation} from "react-i18next";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Classification() {
    const [response, setResponse] = useState([0, 0, 0, 0]);
    const [isLoading, setIsLoading] = useState(false);
    const {t} = useTranslation(); // For the translation

    /*
    * Function to get the image data from the canvas
    * The function checks if the canvas is empty, if not, the image data will be sent
    * as an object to the FastAPI.
    */
    const click = () => {
        setIsLoading(true);
        let canvas = document.querySelector('.cornerstone-canvas');
        let ctx = canvas.getContext('2d');
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let empty = true;
        for (let i = 0; i < imageData.data.length; i++) {
            if (imageData.data[i] !== 0) {
                empty = false;
                break;
            }
        }
        // if the canvas is empty terminate the function
        if (empty) {
            setIsLoading(false)
            return;
        }

        // Create an object with the image data and the dimensions of the canvas
        let body = {
            data: [...imageData.data],
            width: canvas.width,
            height: canvas.height
        };
        let jsonString = JSON.stringify(body);

        // Sending a post request to the FastAPI
        fetch('http://localhost:8000/oct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonString
        }).then(response => {
            return response.json();
        }).then(data => {
            setResponse(data.prediction);
            setIsLoading(false);
        });

    };

    // Creating the bar chart with the labels and the configuration
    const data = {
        labels: ['CSR', 'DR', 'MH', 'Normal'],
        datasets: [
            {
                label: '',
                data: response.map(value => value * 100), // Converting the results into percentages
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
                    text: t("barChart"),
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
            <button className={"btn btn-outline-success"} onClick={click}>{t("classify")}</button>
            <HelpClassification/>
            <div className={"d-flex justify-content-center align-items-center"}>
                {isLoading ? (
                    <div className={"spinner-border text-primary "} role={"status"}>
                        <span className={"visually-hidden"}>Loading...</span>
                    </div>
                ) : (
                    <Bar {...config} /> // Integrating the bar chart with the configuration
                )}
            </div>
        </div>
    )
}