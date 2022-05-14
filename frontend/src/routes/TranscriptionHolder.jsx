import RecordTranscribe from "../components/RecordTranscribe";
import React from "react";

/**
 * Temporary page to hold mp3 recorder
 * Associated with route "/record"
 */
export default function TranscriptionHolder() {
  return (
    <div>
      <RecordTranscribe />
    </div>
  );
}
