import React, { useRef, useEffect, useState } from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneMath from 'cornerstone-math';
import cornerstoneTools from 'cornerstone-tools';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import dicomParser from 'dicom-parser';
import Hammer from 'hammerjs';
import Tool from "./Tools/Tool";
import HelpWindow from "./Help/HelpWindow";
import ResetTool from "./Tools/ResetTool";
import customLoadImage from './Loader/Loader';
import { registerImage } from './Loader/Loader';
import MetadataDisplay from './Metadata/MetadataDisplay';

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;

cornerstoneTools.init();

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstone.registerImageLoader('png', customLoadImage);


function loadImageFromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();

            img.onload = function () {
                resolve(img);
            };

            img.onerror = function () {
                reject(new Error("Bild konnte nicht geladen werden."));
            };

            img.src = e.target.result;
        };

        reader.onerror = function () {
            reject(new Error("Datei konnte nicht gelesen werden."));
        };

        reader.readAsDataURL(file);
    });
}

const DicomViewer = () => {
    const divRef = useRef(null);
    const [imageIds, setImageIds] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState('');
    const [metadata, setMetadata] = useState([]);


    const handleFileUpload = async (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const newImageIds = [];
            const newMetadata = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                let imageId = "";
                if (file.type === "image/png" || file.type === "image/jpeg") {
                    imageId = `png://${file.name}`;
                    const image = await loadImageFromFile(file);
                    registerImage(imageId, image);
                } else if (file.type === 'application/dicom' || file.type === '') {
                    imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
                    const arrayBuffer = await file.arrayBuffer();
                    const dataSet = dicomParser.parseDicom(new Uint8Array(arrayBuffer));
                    const meta = extractMetadata(dataSet);
                    newMetadata.push(meta);
                } else {
                    setError('Nur DICOM, jpg oder png erlaubt');
                    return;
                }

                newImageIds.push(imageId);
            }
            setImageIds(newImageIds);
            setCurrentIndex(0);
            setMetadata(newMetadata);
            setError('');
            loadAndViewImage(newImageIds[0]);
        }
    };


    const extractMetadata = (dataSet) => {
        return {
            patientName: dataSet.string('x00100010'),
            patientId: dataSet.string('x00100020'),
            studyDescription: dataSet.string('x00081030'),
            seriesDescription: dataSet.string('x0008103e'),
            modality: dataSet.string('x00080060'),
            studyDate: dataSet.string('x00080020'),
            seriesNumber: dataSet.string('x00200011'),
            instanceNumber: dataSet.string('x00200013'),
        };
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
        <div className="container-fluid">
            <div className="row flex-wrap">
                <div className="bg-dark col-auto col-md-2 min-vh-100">
                    <div className="bg-dark p-2">
                        <h1 className="text-white">OCT Viewer</h1>
                        <ul className="nav nav-pills flex-column mt-5">
                            <li className="nav-list"><input className={"w-100"} type="file" multiple onChange={handleFileUpload}/></li>
                            <li><Tool tool={cornerstoneTools.RotateTool} commandString={'Rotate'} name={"Drehen"}/></li>
                            <li><Tool tool={cornerstoneTools.WwwcTool} commandString={'Wwwc'} name={"Helligkeit"}/></li>
                            <li><Tool tool={cornerstoneTools.PanTool} commandString={'Pan'} name={"Verschieben"}/></li>
                            <li><Tool tool={cornerstoneTools.ZoomTool} commandString={'Zoom'} name={"Zoom"}/></li>
                            <li><Tool tool={cornerstoneTools.ArrowAnnotateTool} commandString={'ArrowAnnotate'} name={"Kommentar"}/></li>
                            <li><ResetTool element={divRef.current}/></li>
                            <li><HelpWindow /></li>
                        </ul>
                    </div>
                </div>


                <div className="col">
                    <div
                        ref={divRef}
                        style={{width: '512px', height: '512px', backgroundColor: 'black'}}
                    ></div>
                    {error && <div style={{color: 'red', textAlign: 'center', marginTop: '10px'}}>{error}</div>}
                    <div style={{color: 'black', textAlign: 'center', marginTop: '10px'}}>
                        {imageIds.length > 0 && `Bild ${currentIndex + 1} von ${imageIds.length}`}
                    </div>
                </div>
                <div className="col">
                    <MetadataDisplay metadata={metadata}/> {/* Pass the metadata to the MetadataDisplay component */}
                </div>
            </div>
        </div>
    );
};

export default DicomViewer;
