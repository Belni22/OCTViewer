// based on the official Cornerstone WebImage Loader
import cornerstone from 'cornerstone-core';

const canvas = document.createElement('canvas');
let lastImageIdDrawn;
let images = {}

// Saving the image in an object and return the image id
export function registerImage(image, fileName) {
    let imageId = `rasterImages://${fileName}`;
    images[imageId] = image
    return imageId
}

function createImageObject(imageId) {
    let image = images[imageId]
    const rows = image.height;
    const columns = image.width;

    function getPixelData() {
        const imageData = getImageData();
        return imageData.data;
    }

    function getImageData() {
        let context;

        if (lastImageIdDrawn === imageId) {
            context = canvas.getContext('2d');
        } else {
            canvas.height = image.height;
            canvas.width = image.width;
            context = canvas.getContext('2d');

            context.drawImage(image, 0, 0);
            lastImageIdDrawn = imageId;
        }

        return context.getImageData(0, 0, image.width, image.height);
    }

    function getCanvas() {
        if (lastImageIdDrawn === imageId) {
            return canvas;
        }

        canvas.height = image.height;
        canvas.width = image.width;
        const context = canvas.getContext('2d');

        context.drawImage(image, 0, 0);

        lastImageIdDrawn = imageId;

        return canvas;
    }

    return {
        imageId,
        minPixelValue: 0,
        maxPixelValue: 255,
        slope: 1,
        intercept: 0,
        windowCenter: 128,
        windowWidth: 255,
        render: cornerstone.renderColorImage, // Worked only with color images
        getPixelData,
        getCanvas,
        getImage: () => image,
        rows,
        columns,
        height: rows,
        width: columns,
        color: true,
        rgba: false,
        columnPixelSpacing: undefined,
        rowPixelSpacing: undefined,
        invert: false,
        sizeInBytes: rows * columns * 4
    };
}
// Loads the image according to the imageID sends a promise which then can be resolved or be rejected
export default function loadImage(imageId) {
    const promise = new Promise((resolve, reject) => {
        /*
        * Try to create an Image object with the imageID
        *  If it's successfully created it will resolve the promise with the image
        */
        try {
            const image = createImageObject(imageId);
            resolve(image);
        } catch (e) {
            reject(e)
        }
    });

    return {
        promise
    };
}