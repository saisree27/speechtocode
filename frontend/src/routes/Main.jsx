import "../css/main.css";
import "../css/react-toggle.css";

import MonacoEditor from "react-monaco-editor";
import { monaco } from "react-monaco-editor";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TranscriptionHolder from "./TranscriptionHolder";
import { Form } from "react-bootstrap";
import Select from "react-select";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Toggle from "react-toggle";

/**
 * Main page (where our record button and text editor will show up)
 * Associated with route "/learn" (change in index.js)
 */
export default function Main() {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  const [language, setLanguage] = React.useState(null);
  const [activeLine, setActiveLine] = React.useState(-1);
  const [editing, setEditing] = React.useState(false);

  const languageOptions = [
    { value: "js", label: "JavaScript" },
    { value: "py", label: "Python" },
    { value: "java", label: "Java" },
  ];

  const options = {
    selectOnLineNumbers: true,
    semanticHighlighting: true,
  };

  const colors = {
    /*
     * multiValue(remove)/color:hover
     */
    danger: "purple",

    /*
     * multiValue(remove)/backgroundColor(focused)
     * multiValue(remove)/backgroundColor:hover
     */
    dangerLight: "grey",

    /*
     * control/backgroundColor
     * menu/backgroundColor
     * option/color(selected)
     */
    neutral0: "grey",

    /*
     * control/backgroundColor(disabled)
     */
    neutral5: "orange",

    /*
     * control/borderColor(disabled)
     * multiValue/backgroundColor
     * indicators(separator)/backgroundColor(disabled)
     */
    neutral10: "pink",

    /*
     * control/borderColor
     * option/color(disabled)
     * indicators/color
     * indicators(separator)/backgroundColor
     * indicators(loading)/color
     */
    neutral20: "white",

    /*
     * control/borderColor(focused)
     * control/borderColor:hover
     */
    // this should be the white, that's normally selected
    neutral30: "grey",

    /*
     * menu(notice)/color
     * singleValue/color(disabled)
     * indicators/color:hover
     */
    neutral40: "green",

    /*
     * placeholder/color
     */
    // seen in placeholder text
    neutral50: "white",

    /*
     * indicators/color(focused)
     * indicators(loading)/color(focused)
     */
    neutral60: "purple",
    neutral70: "purple",

    /*
     * input/color
     * multiValue(label)/color
     * singleValue/color
     * indicators/color(focused)
     * indicators/color:hover(focused)
     */
    neutral80: "white",

    // no idea
    neutral90: "pink",

    /*
     * control/boxShadow(focused)
     * control/borderColor(focused)
     * control/borderColor:hover(focused)
     * option/backgroundColor(selected)
     * option/backgroundColor:active(selected)
     */
    primary: "white",

    /*
     * option/backgroundColor(focused)
     */
    primary25: "purple",

    /*
     * option/backgroundColor:active
     */
    primary50: "brown",
    primary75: "grey",
  };

  useEffect(() => {
    document.title = "This is a title";
  }, []);

  return (
    <div>
      <div id="bg">
        <img src="bgimg.jpeg"></img>
      </div>

      <div className="topnav">
        <a className="active" href="/">
          Home
        </a>
        <a className="active" href="/learn">
          Speech-To-Code
        </a>
        <a className="active" href="/tutorial">
          Tutorial
        </a>
      </div>
      <div>
        <div>
          <Link to="/" id="tohome">
            <h4 id="icontext">Speech2Code</h4>
            <img src="mic.png"></img>
          </Link>
        </div>
        <h1 className="title">Speech-To-Code</h1>
        <p className="subtitle">Start speaking to start coding!</p>
      </div>

      <div id="recording">
        <TranscriptionHolder />
      </div>

      <div id="select">
        <Select
          value={language}
          onChange={setLanguage}
          options={languageOptions}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...colors,
            },
          })}
        />
      </div>

      <div className="editor">
        {editing ? (
          <MonacoEditor
            height={240}
            language={language}
            theme="vs-dark"
            onChange={(evn) => {
              setCode(evn);
            }}
            value={code}
            options={options}
          />
        ) : (
          <SyntaxHighlighter
            language="javascript"
            style={a11yDark}
            wrapLines={true}
            showLineNumbers={true}
            lineNumberStyle={(lineNumber) => {
              if (lineNumber == activeLine) {
                return {
                  backgroundColor: "#877574",
                };
              }
            }}
            lineProps={(lineNumber) => {
              if (lineNumber == activeLine) {
                return {
                  style: {
                    display: "block",
                    cursor: "pointer",
                    backgroundColor: "#877574",
                  },
                  onClick() {
                    console.log("HERE");
                    // alert(`Line Number Clicked: ${lineNumber}`);
                    setActiveLine(lineNumber);
                  },
                };
              } else {
                return {
                  style: { display: "block", cursor: "pointer" },
                  onClick() {
                    console.log("HERE");
                    // alert(`Line Number Clicked: ${lineNumber}`);
                    setActiveLine(lineNumber);
                  },
                };
              }
            }}
          >
            {code}
          </SyntaxHighlighter>
        )}
        {/* <CodeEditor
          value={code}
          language="js"
          placeholder="Please enter JS code."
          onChange={(evn) => setCode(evn.target.value)}
          padding={15}
          style={{
            fontSize: 12,
            backgroundColor: "black",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        /> */}
      </div>

      <div id="toggle">
        <h3>Edit Code</h3>
        <Toggle
          id="editing"
          defaultChecked={false}
          onChange={(val) => {
            setEditing(!editing);
          }}
        />
      </div>
    </div>
  );
}
