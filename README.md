# Viewer for OCT images and other multimodal data

## Author
Nicolas Bellwald

## About this project

This project was created as a bachelor thesis at the Hes-So Valais-Wallis in Sierre. 
The goal of the project was to create a frontend to display oct images and other multimodal data. 
The project is using React, Cornerstone.js and FastAPI.

The goal of this bachelor thesis was to develop a frontend to display OCT images (PNG, JPG, DICOM) and other multimodal data. The multimodal data includes:
- PDF display
- metadata
- Classification

## Functions of the application
The application contains the following applications:
- Upload and display of image data (JPG, PNG and DICOM)
- Editing images using various tools
- Extract and display metadata from DICOM files
- Possibility to display PDF files
- Classification of images

## Structure of the repository
The repository contains the frontend and the backend, which is a FastAPI. The FastAPI is responsible for classification.
The files for the frontend are located in the folder "src" to open the files for the backend, you will find them in the folder "api"

## Starting the backend
To configure and start the backend, please read the following readme. This is a short guide on how to start the backend.

## Starting the frontend
After you have cloned the Github directory, please proceed as follows:

First enter the following command:
````
npm install
````

Then enter the following command to start:
````
npm run start
````

## Technologies

<img src="public/logos/react-original.svg" alt="React" width="80" height="80">
<img src="public/logos/bootstrap-original.svg" alt="Bootstrap" width="80" height="80">
<img src="public/logos/cornerstone-light.png" alt="Cornerstone.js">
<img src="public/logos/fastapi-original-wordmark.svg" alt="FastAPI" width="100" height="100">


