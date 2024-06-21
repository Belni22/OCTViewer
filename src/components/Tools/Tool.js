import React, {useEffect} from 'react';
import cornerstoneTools from 'cornerstone-tools';

const Tool = ({tool, commandString, name}) => {
    useEffect(() => {
        cornerstoneTools.addTool(tool);
    }, [tool]);

    const activateRotate = () => {
        cornerstoneTools.setToolActive(commandString, {mouseButtonMask: 1});
    };

    return (
        <button type={"button"} className={"btn btn-outline-success mt-2 w-100"} onClick={activateRotate}>{name}</button>
    );
};

export default Tool;
