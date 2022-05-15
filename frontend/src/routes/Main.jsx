import "../css/main.css";
import "../css/react-toggle.css";

import MonacoEditor from "react-monaco-editor";
import { monaco } from "react-monaco-editor";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TranscriptionHolder from "./TranscriptionHolder";
import { Form, Spinner, Button, Dropdown } from "react-bootstrap";
import Select from "react-select";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Toggle from "react-toggle";
import Axios from "axios";
import ParticlesBg from "particles-bg";

// import spinner from './spinner.svg';

/**
 * Main page (where our record button and text editor will show up)
 * Associated with route "/learn" (change in index.js)
 */
export default function Main() {
  const [code, setCode] = React.useState([
    ``,
    `def main():`,
    `\t` + `return None`,
    `if __name__ == '__main__':`,
    `\t` + `main()`,
  ]);
  const [language, setLanguage] = React.useState({
    value: "python",
    label: "Python",
  });
  const [activeLine, setActiveLine] = React.useState(1);
  const [editing, setEditing] = React.useState(false);
  // State variable to set users input
  const [userInput, setUserInput] = React.useState("");
  // State variable to set users output
  const [userOutput, setUserOutput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const languageOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
  ];

  const updateLang = (v) => {
    if (v.value === "python") {
      setCode([
        ``,
        `def main():`,
        `\t` + `return None`,
        `if __name__ == '__main__':`,
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
    const temp_code = code.join("\r\n");
    // Post request to compile endpoint
    Axios.post(`http://localhost:8000/compile`, {
      code: temp_code,
      language: language,
      input: userInput,
    })
      .then((res) => {
        console.log("Res:", res);
        setUserOutput(res.data.output);
      })
      .then(() => {
        setLoading(false);
      });
    console.log("Code: %s", temp_code);
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
    } else if (line.includes(":")) {
      var lines = [line, ``];

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

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#000000",
      color: "#white",
      // match with the menu
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      borderColor: "white",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: "grey",
      },
    }),
    menu: (base) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
      backgroundColor: "#2f2f2f",
    }),
  };

  useEffect(() => {
    document.title = "Speech2Code";
  }, []);

  return (
    <div>
      <div id="bg">
        <img src="newbgimg.jpg"></img>
        <ParticlesBg type="square" bg={true} num={5} />
      </div>
      <div>
        <Link to="/" id="tohome">
          <img src="logo.png"></img>
        </Link>
      </div>

      <div className="topnav">
        <a className="active fw-light font-monospace" href="/">
          HOME
        </a>
        <a className="active fw-light font-monospace" href="/learn">
          SPEECH2CODE
        </a>
        <a className="active fw-light font-monospace" href="/tutorial">
          TUTORIAL
        </a>
      </div>
      <div className="header">
        <p className="position-relative fs-1 fw-light ">Speech2Code</p>
        <p className="position-relative fw-light ">
          Start speaking to start coding!
        </p>
      </div>

      <div id="recording">
        <TranscriptionHolder
          line={activeLine}
          language={language.value}
          setcode={setCode}
          addline={addLine}
        />
      </div>

      <div>
        {/* <Select
          value={language}
          onChange={(v) => {
            setLanguage(v);
            updateLang(v);
          }}
          options={languageOptions}
          styles={customStyles}
        /> */}
        <Dropdown className="select">
          <Dropdown.Toggle
            id="dropdown-button-dark-example1"
            variant="secondary"
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {language.label}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Dropdown.Toggle>

          <Dropdown.Menu variant="dark">
            <Dropdown.Item
              onClick={() => {
                updateLang({ value: "python", label: "Python" });
                setLanguage({ value: "python", label: "Python" });
              }}
            >
              Python
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                updateLang({
                  value: "javascript",
                  label: "JavaScript",
                });
                setLanguage({
                  value: "javascript",
                  label: "JavaScript",
                });
              }}
            >
              JavaScript
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                updateLang({
                  value: "java",
                  label: "Java",
                });
                setLanguage({ value: "java", label: "Java" });
              }}
            >
              Java
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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

      <hr class="dashed" />

      <div className="output-container">
        <h4>Output:</h4>
        {loading ? (
          <div id="spinner-box">
            <Spinner
              as="span"
              animation="border"
              role="status"
              aria-hidden="true"
              style={{ color: "white", marginTop: 10, marginLeft: 10 }}
            />
          </div>
        ) : (
          <div className="output-box">
            <pre>{userOutput}</pre>
            <Button
              onClick={() => {
                clearOutput();
              }}
              className="clear-btn"
            >
              Clear
            </Button>
            <Button
              variant="success"
              className="run-btn"
              onClick={() => compile()}
            >
              Run
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
