import Recorder from "react-mp3-recorder";

export default function RecordTranscribe() {
  let _onComplete = (blob) => {
    console.log("Recording", blob);
  };

  let _onError = (error) => {
    console.log("Error", error);
  };

  return (
    <Recorder onRecordingComplete={_onComplete} onRecordingError={_onError} />
  );
}
