import React from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';

const ResetTool = ({ element }) => {
    const handleReset = () => {
        if (!element) return;

        const enabledElement = cornerstone.getEnabledElement(element);
        const toolStateManager = cornerstoneTools.getElementToolStateManager(enabledElement.element);

        // Clear all tool states for the current element
        toolStateManager.clear(enabledElement.element);

        cornerstone.updateImage(enabledElement.element);
    };

    return (
        <button onClick={handleReset}>Zurücksetzen</button>
    );
};

export default ResetTool;
