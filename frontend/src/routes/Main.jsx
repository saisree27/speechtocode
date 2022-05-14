import "../css/main.css";
import CodeEditor from '@uiw/react-textarea-code-editor';
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

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
      
      <div className="topnav">
          <a className="active" href="/">Home</a>
          <a className="active" href="/learn">Speech-To-Text</a>
          <a className="active" href="/tutorial">Tutorial</a>
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
           
    </div>
  );
}
