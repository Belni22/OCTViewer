import React from 'react';
import cornerstoneTools from 'cornerstone-tools';

const ZoomTool = ({ element }) => {
    const activateZoom = () => {
        const ZoomMouseWheelTool = cornerstoneTools.ZoomMouseWheelTool;
        cornerstoneTools.addTool(ZoomMouseWheelTool);
        cornerstoneTools.setToolActive('ZoomMouseWheel', { mouseButtonMask: 1 });
    };

    return (
        <button onClick={activateZoom}>Zoom</button>
    );
};

export default ZoomTool;
