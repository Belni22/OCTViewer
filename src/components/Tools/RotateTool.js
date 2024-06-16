import React, { useEffect } from 'react';
import cornerstoneTools from 'cornerstone-tools';

const RotateTool = ({ element }) => {
    useEffect(() => {
        if (element) {
            cornerstoneTools.addTool(cornerstoneTools.RotateTool);
            cornerstoneTools.setToolActive('Rotate', { mouseButtonMask: 1 });
        }
    }, [element]);

    const activateRotate = () => {
        cornerstoneTools.setToolActive('Rotate', { mouseButtonMask: 1 });
        cornerstoneTools.setToolDisabled('Wwwc');
        cornerstoneTools.setToolDisabled('Zoom');
    };

    return (
        <button onClick={activateRotate}>Drehen</button>
    );
};

export default RotateTool;
