import Recorder from "react-mp3-recorder";
import React, { useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import MicRecorder from "mic-recorder-to-mp3";
import { Button } from "react-bootstrap";
import MicIcon from "@material-ui/icons/Mic";

import "../css/recordtranscribe.css";

const Mp3Recorder = new MicRecorder({
  bitRate: 64,
  prefix: "data:audio/wav;base64,",
});

export default function RecordTranscribe(props) {
  var [recording, setRecording] = useState(false);
  var [transcription, setTranscription] = useState("");
  var [processing, setProcessing] = useState(false);
  var [received, setReceived] = useState(false);

  var id = "";

  var waitForTranscription = () => {
    setTimeout(() => {
      axios
        .post(
          `http://localhost:5000/check`,
          { id },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          setTranscription(res.data);
          setReceived(true);
          setProcessing(false);
        });
    }, 20000);
  };

  var start = () => {
    Mp3Recorder.start()
      .then(() => {
        setRecording(true);
      })
      .catch((e) => console.error(e));
  };

  var stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const audioURL = URL.createObjectURL(blob);
        setRecording(false);
        const player = new Audio(audioURL);
        player.play();

        _onComplete(blob);
      })
      .catch((e) => console.log(e));
  };

  var _onComplete = (blob) => {
    setProcessing(true);
    console.log("Recording", blob);
    let data = new FormData();
    data.append("file", blob);
    return axios
      .post(`http://localhost:5000/getaudio`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        id = res.data;
        waitForTranscription();
      });
  };

  var submit = () => {
    var line = props.line;
    var language = props.language;

    axios
      .post(
        `http://localhost:5000/code`,
        { line, language },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        props.addline(res.data, props.setcode);
        setReceived(false);
      });
  };

  return (
    <div>
      {!processing ? (
        <div id="buttonsTranscription">
          <div id="buttonHolder">
            {!recording ? (
              <Button
                onClick={start}
                variant="success"
                className="button1 mt-2"
              >
                <MicIcon />
                Press to Record
              </Button>
            ) : (
              <Button onClick={stop} variant="danger">
                <MicIcon />
                Stop Recording
              </Button>
            )}
            {received ? (
              <Button onClick={submit} variant="secondary">
                Generate Code
              </Button>
            ) : (
              <Button onClick={submit} variant="secondary" disabled>
                Generate Code
              </Button>
            )}
          </div>

          <span className="divider" />

          {received ? (
            <div id="transcription" className="fw-light ">
              <p>
                Transcribed text: <strong>{transcription}</strong>
              </p>
            </div>
          ) : (
            <div id="transcription" className="fw-light ">
              <p>
                <strong>No text transcribed.</strong>
              </p>
            </div>
          )}
        </div>
      ) : (
        <div id="spinner">
          <Spinner
            as="span"
            animation="border"
            role="status"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
