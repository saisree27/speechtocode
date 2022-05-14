import Recorder from "react-mp3-recorder";
import React, { useState } from "react";
import axios from "axios";

export default function RecordTranscribe() {
  var [recorded, setRecorded] = useState(false);
  var [recording, setRecording] = useState(null);
  var [transcription, setTranscription] = useState("");

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
        });
    }, 20000);
  };

  var _onComplete = (blob) => {
    console.log("Recording", blob);
    setRecorded(true);
    setRecording(blob);

    var audioURL = URL.createObjectURL(blob);

    const player = new Audio(audioURL);
    player.play();

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

  var _onError = (error) => {
    console.log("Error", error);
    setRecorded(false);
    setRecording(null);
  };

  return (
    <div>
      <Recorder onRecordingComplete={_onComplete} onRecordingError={_onError} />
      <p>{transcription}</p>
    </div>
  );
}
