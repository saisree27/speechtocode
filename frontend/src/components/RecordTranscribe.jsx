import Recorder from "react-mp3-recorder";
import React, { useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import MicRecorder from "mic-recorder-to-mp3";
import { Button } from "react-bootstrap";

const Mp3Recorder = new MicRecorder({
  bitRate: 64,
  prefix: "data:audio/wav;base64,",
});

export default function RecordTranscribe() {
  var [recording, setRecording] = useState(false);
  var [transcription, setTranscription] = useState("");
  var [processing, setProcessing] = useState(false);

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

  return (
    <div>
      {!processing ? (
        <div>
          {!recording ? (
            <Button onClick={start}>Start Recording</Button>
          ) : (
            <Button onClick={stop}>Stop Recording</Button>
          )}

          <p>{transcription}</p>
        </div>
      ) : (
        <div>
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
