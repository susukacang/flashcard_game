ref: https://code.visualstudio.com/docs/python/tutorial-flask

1. prerequisites: 
a. install python extension https://marketplace.visualstudio.com/items?itemName=ms-python.python
b. python packages sudo apt install python3-pip

2. create project env
# Linux
sudo apt-get install python3-venv    # If needed
python3 -m venv env

3. code . in project folder e.g. ~/bin/python/hello_flask

4. select python interpreter i.e. ./env

5. update pip inside Vscode terminal (https://code.visualstudio.com/docs/editor/integrated-terminal)
python -m pip install --upgrade pip

6. install flask
python -m pip install flask

7. run the app
python -m flask run
or
python -m flask run --host=0.0.0.0 --port=80

8. open in browser by Ctrl+click the http://127.0.0.1:5000/

9. stop the app by using Ctrl+C in the terminal

ref: https://flask.palletsprojects.com/en/1.1.x/cli/
10. Changing app to run
export FLASK_APP=flask_app