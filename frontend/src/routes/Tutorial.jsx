import "../css/tutorial.css";

import CodeEditor from "@uiw/react-textarea-code-editor";
import MonacoEditor from "react-monaco-editor";
import { monaco } from "react-monaco-editor";
import React, { useEffect } from "react";
import { Form, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import TranscriptionHolder from "./TranscriptionHolder";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Toggle from "react-toggle";
import Axios from "axios";

/**
 * Tutorial page
 * Associated with route "/tutorial" (change in index.js)
 */
export default function Main() {
  const [code, setCode] = React.useState([
    ``,
    `def main():`,
    `\t` + `return None`,
    `if __name__ == '__main__':`,
    `\t` + `main()`,
  ]);

  const [language, setLanguage] = React.useState("python");
  const [activeLine, setActiveLine] = React.useState(-1);
  const [editingFirst, setEditingFirst] = React.useState(false);
  const [editingSecond, setEditingSecond] = React.useState(false);
  const [editingThird, setEditingThird] = React.useState(false);

  const options = {
    selectOnLineNumbers: true,
    semanticHighlighting: true,
  };

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

  useEffect(() => {
    document.title = "Tutorial";
  }, []);


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

  const [userInput, setUserInput] = React.useState("");
  // State variable to set users output
  const [userOutput, setUserOutput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  

  return (
    <div>
      <div id="bg">
        <img src="bgimg.jpeg"></img>
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
        <div className="header">
          <h1 id="title">Tutorial</h1>
          <p>Get started with Speech2Code!</p>
          <p>Note: this is all written in Python</p>
        </div>
      </div>
      <div id="tutorialHolder">
        <div className="tutorialblock">
          <h2 className="subtitle">Intro</h2>
          <p>
            Speech2Code uses several basic commands to write your program. Like
            traditional programming, these keywords align with actual code.
          </p>
          <p>
            In this tutorial, we'll cover how to create variables, control flow,
            and conditionals. Let's start with some of the basics!
          </p>
          <br />
          <h2 className="subtitle">Background Info</h2>
          <p>
            <strong>Variables </strong>in programming help us store values that
            can be reused and called whenever the variable name itself is called
            by the program.
          </p>
          <p>
            Variables can be created as different data types, including int for
            integers, float for floating point numbers, or char for characters.
          </p>
          <br />
          <p>
            <strong>Conditionals</strong> help programmers make decisions with
            their program's logic. In most languages, they're often described
            with 'if' or 'else'.
          </p>
          <p>
            The 'if' statement takes in a boolean (or true/false) expression
            that is evaluated, and if the result is true, then the program runs
            inside the statement.
          </p>
          <p>
            The 'else' statement always comes after an 'if' statement, executing
            only if that boolean expression results in false and running
            whatever is inside it instead.
          </p>
          <br />
          <p>
            <strong>Control flow</strong> allows programmers to direct the flow
            of their program to repeat certain instructions for set conditions
            or limits. A classic example of this is
          </p>
          <p>
            the 'while' loop, which takes in a boolean expression that is
            evaluated, and if the result is true, then the program runs inside
            the statement until it's false.
          </p>
          <p>
            Alternatively, the 'for' loop initializes a counter and increments
            it by a set number until its boolean expression for this counter
            returns false.
          </p>
          <p>
            While the counter is still within the limit, though, the code inside
            the for loop is executed for as long as intended.
          </p>

          <br />
          <h2 className="subtitle">Commands</h2>
          <p>
            To start speaking your command, click the microphone icon below.
            Make sure you're in a quiet environment so your code is accurate!
          </p>
          <h2 className="subtitle">Variables</h2>

          <p>
            To create a variable, simply say: "
            <strong>assign [datatype] [variable] to [value]</strong>."
          </p>
          <p>
            For example, if you want to declare an integer x equal to zero, you
            might say: "<strong>assign int x to 10</strong>. Go ahead and try it
            below!"
          </p>

          <div id="recording">
            <TranscriptionHolder
              line={activeLine}
              language="python"
              setcode={setCode}
              addline={addLine}
            />
            <br />
          </div>

          <div className="editor">
            {editingFirst ? (
              <MonacoEditor
                language="python"
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
                language="python"
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
                        setActiveLine(lineNumber);
                      },
                    };
                  } else {
                    return {
                      style: {
                        display: "block",
                        cursor: "pointer",
                      },
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
                setEditingFirst(!editingFirst);
              }}
            />
          </div>
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

        <div className="tutorialblock">
          <h3 className="subtitle">Conditionals</h3>
          <p>
            To create an if statement, say: "
            <strong>if [boolean expression]</strong>" and then, after this is
            added, say "<strong>[additional program instruction]</strong>"
          </p>
          <p>
            For example, if you want to see if an integer x is divisible by 10
            and return true, you'd say: "
            <strong>if x mod 10 equals to 0,"</strong> followed by "
            <strong>return true</strong>." Demo below!
          </p>

          <div id="recording">
            <TranscriptionHolder
              line={activeLine}
              language="python"
              setcode={setCode}
              addline={addLine}
            />
            <br />
          </div>
          <div className="editor">
            {editingSecond ? (
              <MonacoEditor
                language="python"
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
                language="python"
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
                        setActiveLine(lineNumber);
                      },
                    };
                  } else {
                    return {
                      style: {
                        display: "block",
                        cursor: "pointer",
                      },
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
                setEditingSecond(!editingSecond);
              }}
            />
          </div>
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

        <div className="tutorialblock">
          <h2 className="subtitle">Control Flow</h2>

          <p>
            To create a for loop, say: "
            <strong>
              create a for loop from [counter's start number] to [end number]
              with increment [number]
            </strong>
            ."
          </p>
          <p>
            For example, if you want to print the number 10 five times, you'd
            say: "
            <strong>create a for loop from 0 to 5 with increment 1,</strong>"
            followed by "<strong>print 10</strong>
            ." Demo below!
          </p>

          <div id="recording">
            <TranscriptionHolder
              line={activeLine}
              language="python"
              setcode={setCode}
              addline={addLine}
            />
            <br />
          </div>

          <div className="editor">
            {editingThird ? (
              <MonacoEditor
                language="python"
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
                language="python"
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
                        setActiveLine(lineNumber);
                      },
                    };
                  } else {
                    return {
                      style: {
                        display: "block",
                        cursor: "pointer",
                      },
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
                setEditingThird(!editingThird);
              }}
            />
          </div>
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
    </div>
  );
}
