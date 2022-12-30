from flask import Flask, jsonify, render_template, request
import json

app = Flask(__name__)

@app.route('/')
def index():
    return "<p>Hi.. I'm at your service.</p>"
    # return render_template('index.html')

@app.route('/doget')
def do_get():
    return jsonify({'name': 'alice',
                       'email': 'alice@outlook.com'})

@app.route('/dopost', methods=['POST'])
def do_post():
    record = json.loads(request.data)
    return jsonify(record)