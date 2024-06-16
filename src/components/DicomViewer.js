import React, { useRef, useEffect, useState } from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneMath from 'cornerstone-math';
import cornerstoneTools from 'cornerstone-tools';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import dicomParser from 'dicom-parser';
import Hammer from 'hammerjs';
import ZoomTool from "./Tools/ZoomTool";
import BrightnessTool from "./Tools/BrightnessTool";
import PanTool from "./Tools/PanTool";
import RotateTool from "./Tools/RotateTool";
import AnnotationTool from "./Tools/AnnotationTool";

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;

cornerstoneTools.init();

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

const DicomViewer = () => {
    const divRef = useRef(null);
    const [imageIds, setImageIds] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState('');

    const handleFileUpload = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const newImageIds = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.type === 'application/dicom' || file.type === '') {
                    const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
                    newImageIds.push(imageId);
                } else {
                    setError('Nur DICOM Bilder erlaubt');
                    return;
                }
            }
            setImageIds(newImageIds);
            setCurrentIndex(0);
            setError('');
            loadAndViewImage(newImageIds[0]);
        }
    };

    const loadAndViewImage = (imageId) => {
        cornerstone.loadImage(imageId).then((image) => {
            const element = divRef.current;
            cornerstone.displayImage(element, image);
        });
    };

    const handleScroll = (event) => {
        if (imageIds.length > 1) {
            const delta = Math.sign(event.deltaY);
            let newIndex = currentIndex + delta;
            if (newIndex >= 0 && newIndex < imageIds.length) {
                setCurrentIndex(newIndex);
                loadAndViewImage(imageIds[newIndex]);
            }
        }
    };

    useEffect(() => {
        const element = divRef.current;
        cornerstone.enable(element);
        element.addEventListener('wheel', handleScroll);
        return () => {
            element.removeEventListener('wheel', handleScroll);
        };
    }, [imageIds, currentIndex]);

    return (
        <div>
            <input type="file" multiple onChange={handleFileUpload} />
            <div
                ref={divRef}
                style={{ width: '512px', height: '512px', backgroundColor: 'black' }}
            ></div>
            {error && <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</div>}
            <div style={{ color: 'black', textAlign: 'center', marginTop: '10px' }}>
                {imageIds.length > 0 && `Bild ${currentIndex + 1} von ${imageIds.length}`}
            </div>
            <ZoomTool element={divRef.current} />
            <BrightnessTool element={divRef.current} />
            <PanTool element={divRef.current} />
            <RotateTool element={divRef.current} />
            <AnnotationTool element={divRef.current} />
        </div>
    );
};

export default DicomViewer;
