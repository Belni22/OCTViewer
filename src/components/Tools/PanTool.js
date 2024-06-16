import React, { useEffect } from 'react';
import cornerstoneTools from 'cornerstone-tools';



const PanTool = ({ element }) => {
    useEffect(() => {
        if (element) {
            cornerstoneTools.addTool(cornerstoneTools.PanTool);
            cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
        }
    }, [element]);

    const activatePan = () => {
        cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
        cornerstoneTools.setToolDisabled('Wwwc');
        cornerstoneTools.setToolDisabled('Zoom');
    };

    return (
        <button onClick={activatePan}>Verschieben</button>
    );
};

export default PanTool;
