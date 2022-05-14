import "../css/main.css";
import CodeEditor from '@uiw/react-textarea-code-editor';
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TranscriptionHolder from "./TranscriptionHolder";

/**
 * Main page (where our record button and text editor will show up)
 * Associated with route "/learn" (change in index.js)
 */
export default function Main() {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  )

  useEffect(() => {
    document.title = "This is a title"
  }, [])

  return (
    <div>
      <div id='bg'>
        <img src='bgimg.jpeg'></img>
      </div>
      
      <div>
        <div> 
          <Link to="/" id='tohome'>
            <h4 id='icontext'>Speech2Code</h4>
            <img src='mic.png'></img>
          </Link>
        </div>
        <h1 className='title'>Speech-To-Code</h1>
        <p className='subtitle'>Start speaking to start coding!</p>
      </div>
      
      <div id='recording'>
        <TranscriptionHolder />
      </div>

      <div className="langs">
        <select>
          {/* <option>
            Language:
            javascript
          </option> */}
          <option>
            Language:
            java
          </option>
          <option>
            Language:
            python
          </option>
        </select>
      </div>     
      {/* <CodeEditor
        id='editor'
        value={code}
        language="js"
        placeholder="Please enter JS code."
        onChange={(evn) => setCode(evn.target.value)}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      /> */}
    </div>
  );
}
