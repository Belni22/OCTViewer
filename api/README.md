# FastAPI - Classification
These instructions are intended to explain to the user how the FastAPI can be configured
and start it, so that the project can be tested on your own computer/laptop. The API will run on
http://localhost:8000

## Prerequisites

- Python installed
- Github directory cloned


## Information
This guide was created with **Python version 3.12.4**, it is not guaranteed that program will work with other versions.

## Model
Since the model used is not in the Github directory, make sure that you load your own model into the project and change the following line in the file **main.py** 
so that your model is loaded.
````ps1
model = load_model('yourmodel.h5')
````
If you need the model from the project, please contact the author.

## Configuration
Make sure that you are in the correct directory: ..\application\api

Enter the following command to create the virtual environment (venv)
````ps1
python -m venv .venv
````

Enter the following command to activate the virtual environment
````ps1
.venv/Scripts/activate.ps1
````
The terminal will then display (.venv) in front of the path:

````
(.venv) PS C:\your\path\application\api>
````
Enter the following command to install the requirements
````ps1
pip install -r requirements.txt
````

To start the api, make sure that the venv is activated, then run the following command
````ps1
Fastapi run main.py
````

Make sure that two additional folders "data" and "oct" have been created

The FastApi is now running and can be used.

>**Please note**: If you close the project and reopen it, it's possible that you need to activate 
the virtual environment again. After the check if the virtual environment is activated you can start the api.

