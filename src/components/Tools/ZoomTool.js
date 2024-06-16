import React, { useEffect } from 'react';
import cornerstoneTools from 'cornerstone-tools';




const ZoomTool = ({ element }) => {
    const activateZoom = () => {
        const ZoomTool = cornerstoneTools.ZoomTool;
        cornerstoneTools.addTool(ZoomTool);
        cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
    };

    useEffect(() => {
        if (element) {
            cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
            cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
        }
    }, [element]);

    return (
        <button onClick={activateZoom}>Zoom</button>
    );
};

export default ZoomTool;
