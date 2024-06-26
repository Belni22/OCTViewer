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
import PdfViewer from './pdfviewer/PdfViewer';

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
                    newImageIds.push(imageId);
                } else if (file.type === 'application/dicom' || file.type === '') {
                    imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);

                    const arrayBuffer = await file.arrayBuffer();
                    const dataSet = dicomParser.parseDicom(new Uint8Array(arrayBuffer));
                    const meta = extractMetadata(dataSet);
                    const numberOfFrames = Number(dataSet.string('x00280008'))

                    newMetadata.push(meta);

                    if (isNaN(numberOfFrames)) {
                        newImageIds.push(imageId);
                    } else {
                        for (let frameIndex = 0; frameIndex < numberOfFrames; frameIndex++) {
                            newImageIds.push(imageId + `?frame=${frameIndex}`);
                        }
                    }
                } else {
                    setError('Nur DICOM, jpg oder png erlaubt');
                    return;
                }


            }
            let middle = Math.floor(newImageIds.length / 2);

            setImageIds(newImageIds);
            setCurrentIndex(middle);
            setMetadata(newMetadata);
            setError('');
            loadAndViewImage(newImageIds[middle]);
        }
    };


    const extractMetadata = (dataSet) => {
        return {
            patientName: dataSet.string('x00100010'),
            patientId: dataSet.string('x00100020'),
            studyDescription: dataSet.string('x00081030'),
            seriesDescription: dataSet.string('x0008103e'),
            manufacturer: dataSet.string('x00080070'),
            stationName: dataSet.string('x00081010'),
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
        <div className="d-flex vh-100">
            <div className="bg-dark p-3 flex-shrink-0">
                <h1 className={"text-white"}>OCT Viewer</h1>
                <ul className="nav flex-column mt-3">
                    <li className="nav-item">
                        <input className="form-control mb-2" type="file" multiple onChange={handleFileUpload}/>
                    </li>
                    <li className="nav-item"><Tool tool={cornerstoneTools.RotateTool} commandString="Rotate" name="Drehen"/></li>
                    <li className="nav-item"><Tool tool={cornerstoneTools.WwwcTool} commandString="Wwwc" name="Helligkeit"/></li>
                    <li className="nav-item"><Tool tool={cornerstoneTools.PanTool} commandString="Pan" name="Verschieben"/></li>
                    <li className="nav-item"><Tool tool={cornerstoneTools.ZoomTool} commandString="Zoom" name="Zoom"/></li>
                    <li className="nav-item"><Tool tool={cornerstoneTools.ArrowAnnotateTool} commandString="ArrowAnnotate" name="Kommentar"/></li>
                    <li className="nav-item"><ResetTool element={divRef.current}/></li>
                    <li className="nav-item"><HelpWindow/></li>
                </ul>
            </div>
            <div className="flex-grow-1 overflow-auto p-3">
                <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                        <div ref={divRef} className="w-100" style={{height: '512px', backgroundColor: 'black'}}></div>
                        {error && <div className="text-danger text-center mt-2">{error}</div>}
                        <div className="text-center mt-2">
                            {imageIds.length > 0 && `Bild ${currentIndex + 1} von ${imageIds.length}`}
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <MetadataDisplay
                            metadata={metadata}/> {/* Pass the metadata to the MetadataDisplay component */}
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <PdfViewer/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DicomViewer;
