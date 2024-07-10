import React, {useEffect} from 'react';
import cornerstoneTools from 'cornerstone-tools';

const Tool = ({tool, commandString, name}) => {
    /*
    * When the application starts all the tools are rendered and added to the toolbox, so that the tools
    * can be used and activated afterward
    */
    useEffect(() => {
        cornerstoneTools.addTool(tool);
    }, [tool]);

    /*
    * Activates the tool according to the command string
    * All tools can be used with the left mouse button
    */
    const activateTool = () => {
        cornerstoneTools.setToolActive(commandString, {mouseButtonMask: 1});
    };

    // Creates a button for the tool, designed with bootstrap
    return (
        <button type="button" className={"btn btn-outline-success mt-2 w-100"} onClick={activateTool}>{name}</button>
    );
};

export default Tool;
