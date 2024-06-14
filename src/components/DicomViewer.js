import React, { useRef, useEffect } from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import dicomParser from 'dicom-parser';

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

const DicomViewer = () => {
    const divRef = useRef(null);

    const handleFileUpload = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
            loadAndViewImage(imageId);
        }
    };

    const loadAndViewImage = (imageId) => {
        cornerstone.loadImage(imageId).then((image) => {
            const element = divRef.current;
            cornerstone.displayImage(element, image);
        });
    };

    useEffect(() => {
        const element = divRef.current;
        cornerstone.enable(element);
    }, []);

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
            <div
                ref={divRef}
                style={{ width: '512px', height: '512px', backgroundColor: 'black' }}
            ></div>
        </div>
    );
};

export default DicomViewer;
