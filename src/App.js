import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Viewer from './components/Viewer';
import DicomViewer from './components/DicomViewer';
import './App.css';

function App() {
    const [file, setFile] = useState(null);

    const handleFileUpload = (files) => {
        setFile(files[0]);
    };

    return (
        <div className="app">
            <Sidebar onFileUpload={handleFileUpload} />
            <div className="viewer">
                {file && <Viewer file={file} />}
            </div>
            <DicomViewer />
        </div>
    );
}

export default App;
