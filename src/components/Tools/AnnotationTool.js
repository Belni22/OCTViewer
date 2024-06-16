import React, { useEffect } from 'react';
import cornerstoneTools from 'cornerstone-tools';

const AnnotationTool = ({ element }) => {
    useEffect(() => {
        if (element) {
            cornerstoneTools.addTool(cornerstoneTools.ArrowAnnotateTool);
            cornerstoneTools.setToolActive('ArrowAnnotate', { mouseButtonMask: 1 });
        }
    }, [element]);

    const activateAnnotation = () => {
        cornerstoneTools.setToolActive('ArrowAnnotate', { mouseButtonMask: 1 });
        cornerstoneTools.setToolDisabled('Wwwc');
        cornerstoneTools.setToolDisabled('Zoom');
    };

    return (
        <button onClick={activateAnnotation}>Notiz</button>
    );
};

export default AnnotationTool;
