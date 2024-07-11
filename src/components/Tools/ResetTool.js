import React from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import {useTranslation} from "react-i18next";



const ResetTool = ({ element }) => {
    const {t} = useTranslation(); // For the translation
    const handleReset = () => {
        if (!element) return;

        const enabledElement = cornerstone.getEnabledElement(element);
        const toolStateManager = cornerstoneTools.getElementToolStateManager(enabledElement.element);

        /*
        * It will clear all annotations
        * because the toolStateManager is not used for zoom, pan etc.
        */
        toolStateManager.clear(enabledElement.element);

        cornerstone.updateImage(enabledElement.element);
    };

    return (
        <button type={"button"} className={"btn btn-outline-warning mt-2 w-100"} onClick={handleReset}>{t("resetComment")}</button>
    );
};

export default ResetTool;
