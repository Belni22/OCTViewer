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
import Classification from './classification/Classification';
import {useTranslation} from "react-i18next";
import LanguageSelector from "./languageSelector/Language-selector";

// Initialize cornerstone
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;

// Initialize the cornerstone tools
cornerstoneTools.init();

// Initialize the wado image loader that it is possible to upload and edit dicom images
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// Register the custom image loader for png and jpg
cornerstone.registerImageLoader('rasterImages', customLoadImage);



// function to convert the uploaded jpg and png files into image objects
function loadImageFromFile(file) {
    // Returns a promise which then can be resolved with the image or get rejected and receives an error
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();
            // As soon as the image is loaded the promise will be resolved with the image
            img.onload = function () {
                resolve(img);
            };
            // If the loading of the image fails it will reject the promise and an error message is displayed
            img.onerror = function () {
                reject(new Error("Bild konnte nicht geladen werden."));
            };

            img.src = e.target.result;
        };

        reader.onerror = function () {
            reject(new Error("Datei konnte nicht gelesen werden."));
        };
        // Reads the data as a URL which is in base64 format. This is used to load and display the image
        reader.readAsDataURL(file);//
    });
}


const DicomViewer = () => {
    const divRef = useRef(null);
    const {t} = useTranslation(); // For the translation
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
                // Checks if it's a png/jpg or a dicom image
                if (file.type === "image/png" || file.type === "image/jpeg") {
                    const image = await loadImageFromFile(file); // loading the image
                    imageId = registerImage(image, file.name); //register the image to receive an imageid
                    newImageIds.push(imageId);
                } else if (file.type === 'application/dicom' || file.type === '') {
                    imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
                    const arrayBuffer = await file.arrayBuffer();
                    const dataSet = dicomParser.parseDicom(new Uint8Array(arrayBuffer));
                    const meta = extractMetadata(dataSet); // Extraction of the metadata and store it in an object
                    const numberOfFrames = Number(dataSet.string('x00280008'))// get the number of frames

                    newMetadata.push(meta);
                    /*
                    * If number of Frames is not a number, then it's a single frame, so it will push only one imageid
                    * If it has a number of frame value it's a multi frame, so it will go through all the frames and pushes
                    * an imageid
                    */
                    if (isNaN(numberOfFrames)) {
                        newImageIds.push(imageId);
                    } else {
                        for (let frameIndex = 0; frameIndex < numberOfFrames; frameIndex++) {
                            newImageIds.push(imageId + `?frame=${frameIndex}`);
                        }
                    }
                } else {
                    setError(t("error_message_Images"));
                    return;
                }


            }
            /*
            * Responsible that it will display the image at the middle position later.
            * For example is a user uploads a volume
            */
            let middle = Math.floor(newImageIds.length / 2);

            setImageIds(newImageIds);
            setCurrentIndex(middle);
            setMetadata(newMetadata);
            setError('');
            loadAndViewImage(newImageIds[middle]);
        }
    };

    // Set the value for the object properties
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

    /*
    * Is loading the image according to the image id and display
    * the image in the element which is referred with divRef
    * (the display for the images)
    */
    const loadAndViewImage = (imageId) => {
        cornerstone.loadImage(imageId).then((image) => {
            const element = divRef.current;
            cornerstone.displayImage(element, image);
        });
    };


    const handleScroll = (event) => {
        if (imageIds.length > 1) {
            const delta = Math.sign(event.deltaY); // If scroll up +1 if scroll down -1
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
    });

    // Responsible for the display of the different components, it's designed by using bootstrap
    return (
        <div className="d-flex vh-100">
            <div className="bg-dark p-3 flex-shrink-0">
                <h1 className={"text-white"}>OCT Viewer</h1>
                <ul className="nav flex-column mt-3">
                    <li className="nav-item">
                        <input className="form-control mb-2" type="file" multiple onChange={handleFileUpload}/>
                    </li>
                    <li className="nav-item"><Tool tool={cornerstoneTools.RotateTool} commandString="Rotate" name={t('turn')}/></li>
                    <li className="nav-item"><Tool tool={cornerstoneTools.WwwcTool} commandString="Wwwc" name={t("brightnessContrast")}/></li>
                    <li className="nav-item"><Tool tool={cornerstoneTools.PanTool} commandString="Pan" name={t("move")}/></li>
                    <li className="nav-item"><Tool tool={cornerstoneTools.ZoomTool} commandString="Zoom" name={t("zoom")}/></li>
                    <li className="nav-item"><Tool tool={cornerstoneTools.ArrowAnnotateTool} commandString="ArrowAnnotate" name={t("comment")}/></li>
                    <li className="nav-item"><ResetTool element={divRef.current}/></li>
                    <li className="nav-item"><HelpWindow/></li>
                </ul>
                <LanguageSelector/>
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
                            metadata={metadata}/>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <PdfViewer/>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <Classification/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DicomViewer;
