// Code based on https://www.youtube.com/watch?v=9eMFU3oV7cQ
import React, { useState } from 'react';
import './PdfViewer.css';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {useTranslation} from "react-i18next";

export default function PdfViewer() {
    /*
    * Different states:
    * To store the uploaded pdf, to display the pdf file and to set an error message
    */
    const [pdfFile, setPDFFile] = useState(null);
    const [viewPDF, setViewPDF] = useState(null);
    const [error, setError] = useState(null);
    const {t} = useTranslation(); // For the translation

    // Initializing the default layout for the pdf viewer
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const fileType = ['application/pdf'];
    const handleChange = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) { // Checks if the file type is a pdf
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onload = (e) => {
                    setPDFFile(e.target.result); // sets the state to the uploaded pdf
                    setError(null);
                };
            } else {
                setPDFFile(null);
                setError('Es werden nur PDF-Dateien akzeptiert'); // If no pdf was uploaded it will display this error message
            }
        } else {
            console.log('Error');
        }
    };

    // Function to display the uploaded pdf file
    const handleSubmit = (e) => {
        e.preventDefault();
        if (pdfFile !== null) {
            setViewPDF(pdfFile);
            setError(null);
        } else {
            setViewPDF(null); // if no pdf was uploaded and the user clicks on the button it will display an error
            setError(t("error_message_PDF"))
        }
    };

    return (
        <div className="container">
            <div className="d-flex align-items-center mb-3">
                <input type="file" className="form-control file-input w-50" onChange={handleChange}/>
                <form onSubmit={handleSubmit} className="ms-2">
                    <button type="submit" className="btn btn-outline-success">{t("viewPDF")}</button>
                </form>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="pdf-container">
                {/* Using a web worker to render the pdf */}
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    {viewPDF ? (
                        // Displays the pdf with the default layout
                        <Viewer fileUrl={viewPDF} plugins={[defaultLayoutPluginInstance]}/>
                    ) : (
                        <div className="pdf-placeholder">PDF Preview</div>
                    )}
                </Worker>
            </div>
        </div>
    );
}
