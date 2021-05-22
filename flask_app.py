
# A very simple Flask Hello World app for you to get started with...

from simple import playGameWeb, pickQuestion
from flask import Flask, render_template, redirect, request, url_for, jsonify, session

app = Flask(__name__)
app.config['DEBUG'] = True

comments = []

# Set the secret key to some random bytes. Keep this really secret!
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

@app.route('/', methods=['GET', 'POST'])
def play():
    if request.method == 'GET':
        return render_template('play_page.html') #, comments = comments)
    # comments.append(request.form['contents'])
    return redirect(url_for('play'))

@app.route('/_guess')
def guess():

    all = request.args

    print(f'debug info guess all ' + str(all), flush=True)

# all data is already serialized
    session['fb_object'] = all

    result = playGameWeb(all)
    return jsonify(result = result)

@app.route('/_get_question')
def getQuestion():
    p = request.args
    print(p)
# create pv iterator
    pv = p.values()
    _kv={}
    while True:
        try:
            key = next(pv)
            _kv[key] = next(pv)
            print(_kv)
        except StopIteration:
            break

# kv is a dictionary
    q = pickQuestion(_kv)
    return jsonify(question = q)

