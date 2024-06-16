import React from 'react';
import cornerstoneTools from 'cornerstone-tools';

const BrightnessTool = ({ element }) => {
    const activateBrightness = () => {
        const WwwcTool = cornerstoneTools.WwwcTool;
        cornerstoneTools.addTool(WwwcTool);
        cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });
    };

    return (
        <button onClick={activateBrightness}>Helligkeit</button>
    );
};

export default BrightnessTool;
