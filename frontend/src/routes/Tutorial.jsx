import "../css/tutorial.css";

import CodeEditor from "@uiw/react-textarea-code-editor";
import MonacoEditor from "react-monaco-editor";
import { monaco } from "react-monaco-editor";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TranscriptionHolder from "./TranscriptionHolder";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Toggle from "react-toggle";

/**
 * Tutorial page
 * Associated with route "/tutorial" (change in index.js)
 */
export default function Main() {
  const [code, setCode] = React.useState(`def add(a, b): {\n  return a + b\n}`);

  const [language, setLanguage] = React.useState(null);
  const [activeLine, setActiveLine] = React.useState(-1);
  const [editingFirst, setEditingFirst] = React.useState(false);
  const [editingSecond, setEditingSecond] = React.useState(false);
  const [editingThird, setEditingThird] = React.useState(false);

  const options = {
    selectOnLineNumbers: true,
    semanticHighlighting: true,
  };

  useEffect(() => {
    document.title = "Tutorial";
  }, []);

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
            <TranscriptionHolder />
            <br />
          </div>

          <div className="editor">
            {editingFirst ? (
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

        <div className="tutorialblock">
          <h3 className="subtitle">Conditionals</h3>
          <p>
            To create an if statement, say: "
            <strong>
              if [boolean expression], [additional program instruction]
            </strong>
            ."
          </p>
          <p>
            For example, if you want to see if an integer x is divisible by 10
            and return true, you'd say: "
            <strong>if x mod 10 equals to 0, return true</strong>. Demo below!"
          </p>

          <div id="recording">
            <TranscriptionHolder />
            <br />
          </div>
          <div className="editor">
            {editingSecond ? (
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
            <strong>
              create a for loop from 0 to 5 with increment 1, print 10
            </strong>
            . Demo below!"
          </p>

          <div id="recording">
            <TranscriptionHolder />
            <br />
          </div>

          <div className="editor">
            {editingThird ? (
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
      </div>
    </div>
  );
}
