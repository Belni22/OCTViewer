import React, { useState } from 'react';
import './PdfViewer.css';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function PdfViewer() {
    const [pdfFile, setPDFFile] = useState(null);
    const [viewPDF, setViewPDF] = useState(null);
    const [error, setError] = useState(null);


    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const fileType = ['application/pdf'];
    const handleChange = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onload = (e) => {
                    setPDFFile(e.target.result);
                    setError(null);
                };
            } else {
                setPDFFile(null);
                setError('Es werden nur PDF-Dateien akzeptiert');
            }
        } else {
            console.log('Error');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pdfFile !== null) {
            setViewPDF(pdfFile);
            setError(null);
        } else {
            setViewPDF(null);
            setError('Es werden nur PDF-Dateien akzeptiert')
        }
    };

    return (
        <div className="container">
            <div className="d-flex align-items-center mb-3">
                <input type="file" className="form-control file-input w-50" onChange={handleChange}/>
                <form onSubmit={handleSubmit} className="ms-2">
                    <button type="submit" className="btn btn-outline-success">View PDF</button>
                </form>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="pdf-container">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    {viewPDF ? (
                        <Viewer fileUrl={viewPDF} plugins={[defaultLayoutPluginInstance]}/>
                    ) : (
                        <div className="pdf-placeholder">PDF Preview</div>
                    )}
                </Worker>
            </div>
        </div>
    );
}
