from flask import Flask
from flask import request, jsonify
import os
import requests
import config
import re
import sys
sys.path.append("../../")
from PL import Scanner, Interpreter, Parser

app = Flask(__name__)
KEY = config.API_KEY
TEXT = ""

@app.route('/')
def home():
  return "Yeah, the app works."

@app.route('/getaudio', methods=['post'])
def form():
  if request.method == 'POST':
    file = request.files['file']
    with open("../audio/audio.wav", "wb") as f:
      f.write(file.read())
    
    transcriptionID = submit_for_transcription()
    return transcriptionID

@app.route('/check', methods=['post'])
def check():
  if request.method == 'POST':
    ID = request.json["id"]
    endpoint = "https://api.assemblyai.com/v2/transcript/" + ID
    headers = {
        "authorization": KEY,
    }
    response = requests.get(endpoint, headers=headers)
    print(response.json())

    TEXT = re.sub(r'[^\w\s]', '', response.json()["text"]).lower()
    scanned = Scanner.Scanner(TEXT, language).scanTokens()
    parsed = Parser.Parser(scanned, language).parse()
    TEXT = Interpreter.Interpreter(language).interpret(parsed)
    return response.json()["text"]


def submit_for_transcription():
  filename = "../audio/audio.wav"
  def read_file(filename, chunk_size=5242880):
    with open(filename, 'rb') as _file:
      while True:
        data = _file.read(chunk_size)
        if not data:
          break
        yield data

  headers = {'authorization': KEY}
  response = requests.post('https://api.assemblyai.com/v2/upload',
                          headers=headers,
                          data=read_file(filename))
  print(response.json())
  url = response.json()["upload_url"]

  endpoint = "https://api.assemblyai.com/v2/transcript"
  json = {
    "audio_url": url,
  }
  headers = {
    "authorization": KEY,
    "content-type": "application/json"
  }
  response = requests.post(endpoint, json=json, headers=headers)

  return response.json()["id"]

if __name__ == '__main__':
    app.run(host="0.0.0.0")
