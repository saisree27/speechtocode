import RecordTranscribe from "../components/RecordTranscribe";
import React from "react";

/**
 * Temporary page to hold mp3 recorder
 * Associated with route "/record"
 */
export default function TranscriptionHolder(props) {
  return (
    <div>
      <RecordTranscribe
        line={props.line}
        language={props.language}
        setcode={props.setcode}
      />
    </div>
  );
}
