// Viewer.js
import React from 'react';

const Viewer = ({ file }) => {
    const imageUrl = URL.createObjectURL(file);

    return (
        <div>
            <img src={imageUrl} alt="Uploaded" style={{ width: '512px', height: '512px', objectFit: 'contain' }} />
        </div>
    );
};

export default Viewer;
