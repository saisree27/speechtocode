import Recorder from "react-mp3-recorder";
import React, { useState } from "react";

export default function RecordTranscribe() {
  var [recorded, setRecorded] = useState(false);
  var [recording, setRecording] = useState(null);

  let _onComplete = (blob) => {
    console.log("Recording", blob);
    setRecorded(true);
    setRecording(blob);

    const player = new Audio(URL.createObjectURL(blob));
    player.play();
  };

  let _onError = (error) => {
    console.log("Error", error);
    setRecorded(false);
    setRecording(null);
  };

  return (
    <Recorder onRecordingComplete={_onComplete} onRecordingError={_onError} />
  );
}
