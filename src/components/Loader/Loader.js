import cornerstone from 'cornerstone-core';

const canvas = document.createElement('canvas');
let lastImageIdDrawn;
let images = {}

//Images saved in an object
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
        render: cornerstone.renderColorImage,
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

export default function loadImage(imageId) {
    const promise = new Promise((resolve, reject) => {
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