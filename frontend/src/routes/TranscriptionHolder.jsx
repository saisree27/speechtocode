import RecordTranscribe from "../components/RecordTranscribe";
import React from "react";
import "../css/recordtranscribe.css";

/**
 * Temporary page to hold mp3 recorder
 * Associated with route "/record"
 */
export default function TranscriptionHolder(props) {
  return (
    <div id="transcriptionHolder">
      <RecordTranscribe
        line={props.line}
        language={props.language}
        setcode={props.setcode}
        addline={props.addline}
      />
    </div>
  );
}
