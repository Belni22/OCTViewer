import React, { useState } from 'react';
import DicomViewer from './components/DicomViewer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {


    return (
        <div className="app">
            <DicomViewer />
        </div>
    );
}

export default App;
