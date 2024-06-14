import React from 'react';
import '../Sidebar.css';
import { useDropzone } from 'react-dropzone';
import cornerstoneTools from 'cornerstone-tools';

const Sidebar = ({ onFileUpload }) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop: acceptedFiles => {
            onFileUpload(acceptedFiles);
        },
    });

    const handleZoom = () => {
        const element = document.querySelector('.cornerstone-element');
        const ZoomTool = cornerstoneTools.ZoomTool;
        cornerstoneTools.addTool(ZoomTool);
        cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
        cornerstoneTools.setToolActive('ZoomTouchPinch', { mouseButtonMask: 0 });
    };

    return (
        <div className="sidebar">
            <div className="tool-buttons">
                <button className="tool-button" onClick={handleZoom}>Zoom</button>
                <button className="tool-button">Drehen</button>
                <button className="tool-button">Verschieben</button>
                <button className="tool-button">Helligkeit</button>
                <button className="tool-button">Klassifizierung</button>
            </div>
            <button className="help-button" onClick={() => alert('Hilfe Seite')}>
                Hilfe
            </button>
            <div className="upload-area" {...getRootProps()}>
                <input {...getInputProps()} />
                <button className="upload-button">Upload</button>
            </div>
        </div>
    );
};

export default Sidebar;
