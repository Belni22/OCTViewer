import os

from fastapi import FastAPI
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np


class DataModel(BaseModel):
    data: List[int]
    width: int
    height: int


app = FastAPI()

origins = [
  "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model('finetuned_modelocttool.h5')
valid_test_datagen = ImageDataGenerator(
    rescale=1. / 255,
)


existing_folder = os.path.exists("data/oct")
if not existing_folder:
    os.makedirs("data/oct")


def array_to_image(data, width, height):
    data = np.array(data, dtype=np.uint8)
    image_data = data.reshape((height, width, 4))
    img = Image.fromarray(image_data, 'RGBA')
    img.save('data/oct/output.png')


@app.post("/oct")
async def predict(data_model: DataModel):
    array_to_image(data_model.data, data_model.width, data_model.height)
    generator = valid_test_datagen.flow_from_directory(
        "data",
        target_size=(150, 150),
        color_mode='rgb',
        batch_size=32,
        class_mode='categorical',
        shuffle=False,
    )

    prediction = model.predict(generator)
    os.remove("data/oct/output.png")

    return {"prediction": prediction.tolist()[0]}
