import React, { useEffect } from 'react';
import cornerstone from  'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';




const BrightnessTool = ({ element }) => {
    const activateBrightness = () => {
        const WwwcTool = cornerstoneTools.WwwcTool;
        cornerstoneTools.addTool(WwwcTool);
        cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });
        console.log("Button activated")
    };


    return (
        <button onClick={activateBrightness}>Helligkeit</button>
    );
};

export default BrightnessTool;
