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
import Axios from "axios";
// import spinner from './spinner.svg';

/**
 * Main page (where our record button and text editor will show up)
 * Associated with route "/learn" (change in index.js)
 */
export default function Main() {
  const [code, setCode] = React.useState([
    ``,
    `function main() {`,
    `\t` + `return;`,
    `}`,
  ]);
  const [language, setLanguage] = React.useState({
    value: "javascript",
    label: "Javascript",
  });
  const [activeLine, setActiveLine] = React.useState(1);
  const [editing, setEditing] = React.useState(false);
  // State variable to set users input
  const [userInput, setUserInput] = React.useState("");
  // State variable to set users output
  const [userOutput, setUserOutput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const languageOptions = [
    { value: "javascript", label: "Javascript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
  ];

  const updateLang = (v) => {
    if (v.value === "python") {
      setCode([
        ``,
        `def main():`,
        `\t` + `return None`,
        `if __name__ == 'main':`,
        `\t` + `main()`,
      ]);
      setActiveLine(2);
    } else if (v.value === "java") {
      setCode([
        ``,
        `public class Main {`,
        `\t` + `public static void main(String[] args) {`,
        `\t\t` + `return;`,
        `\t` + `}`,
        `}`,
      ]);
      setActiveLine(3);
    } else {
      setCode([``, `function main() {`, `\t` + `return;`, `}`]);
      setActiveLine(2);
    }
  };

  const options = {
    selectOnLineNumbers: true,
    semanticHighlighting: true,
  };

  // Function to call the compile endpoint
  function compile() {
    setLoading(true);
    if (code === ``) {
      return;
    }

    // Post request to compile endpoint
    Axios.post(`http://localhost:8000/compile`, {
      code: code,
      language: language,
      input: userInput,
    })
      .then((res) => {
        setUserOutput(res.data.output);
      })
      .then(() => {
        setLoading(false);
      });
    console.log("Code: %s", code);
    console.log("Language: ", language);
  }

  // Function to clear the output screen
  function clearOutput() {
    setUserOutput("");
  }

  var addLine = (newline, updater) => {
    var codeCopy = [...code];
    var line = newline;
    var moreTabs = false;

    var prevLineLastChar =
      codeCopy[activeLine - 1][codeCopy[activeLine - 1].length - 1];

    console.log(prevLineLastChar);

    var tabCountPrevLine = codeCopy[activeLine - 1].split("\t").length - 1;
    console.log(tabCountPrevLine);

    if (prevLineLastChar == ":") {
      moreTabs = true;
      for (var i = 0; i < tabCountPrevLine + 1; i++) {
        line = "\t" + line;
      }
    } else if (prevLineLastChar == "{") {
      moreTabs = true;
      for (var i = 0; i < tabCountPrevLine + 1; i++) {
        line = "\t" + line;
      }
    } else {
      for (var i = 0; i < tabCountPrevLine; i++) {
        line = "\t" + line;
      }
    }

    console.log(line);

    if (line.includes("{}")) {
      var lines = [line.substring(0, line.length - 1), `}`];

      if (moreTabs) {
        for (var i = 0; i < tabCountPrevLine + 1; i++) {
          lines[1] = "\t" + lines[1];
        }
      } else {
        for (var i = 0; i < tabCountPrevLine; i++) {
          lines[1] = "\t" + lines[1];
        }
      }

      codeCopy.splice(activeLine, 0, lines[0]);
      codeCopy.splice(activeLine + 1, 0, lines[1]);
    } else {
      codeCopy.splice(activeLine, 0, line);
    }

    updater(codeCopy);
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
    document.title = "Main";
  }, []);

  return (
    <div>
      <div id="bg">
        <img src="newbgimg.jpg"></img>
      </div>
      <div>
        <Link to="/" id="tohome">
          <img src="logo.png"></img>
        </Link>
      </div>

      <div className="topnav">
        <a className="active" href="/">
          Home
        </a>
        <a className="active" href="/learn">
          Speech2Code
        </a>
        <a className="active" href="/tutorial">
          Tutorial
        </a>
      </div>
      <div>
        <h1 id="title">Speech2Code</h1>
        <p id="subtitle">Start speaking to start coding!</p>
      </div>

      <div id="recording">
        <TranscriptionHolder
          line={activeLine}
          language={language.value}
          setcode={setCode}
          addline={addLine}
        />
      </div>

      <div id="select">
        <Select
          value={language}
          onChange={(v) => {
            setLanguage(v);
            updateLang(v);
          }}
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
            language={language.value}
            theme="vs-dark"
            onChange={(evn) => {
              setCode(evn.split("\n"));
              console.log(language);
            }}
            value={code.join("\n")}
            options={options}
          />
        ) : (
          <SyntaxHighlighter
            language={language.value}
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
                    width: 810,
                  },
                  onClick() {
                    setActiveLine(lineNumber);
                  },
                };
              } else {
                return {
                  style: { display: "block", cursor: "pointer", width: 810 },
                  onClick() {
                    console.log("HERE");
                    // alert(`Line Number Clicked: ${lineNumber}`);
                    setActiveLine(lineNumber);
                  },
                };
              }
            }}
          >
            {code.join("\r\n")}
          </SyntaxHighlighter>
        )}
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

      <button className="runBtn" onClick={() => compile()}>
        Run
      </button>
      <div className="output-container">
        <h4>Output:</h4>
        {loading ? (
          <div className="spinner-box">
            <img /*src={spinner}*/ alt="Loading..." />
          </div>
        ) : (
          <div className="output-box">
            <pre>{userOutput}</pre>
            <button
              onClick={() => {
                clearOutput();
              }}
              className="clear-btn"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
