import "../css/landing.css";
import "../css/main.css";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import GithubCorner from "react-github-corner";
import ParticlesBg from "particles-bg";

/**
 * Landing page of application
 * Associated with route "/"
 */
export default function Landing() {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  const options = {
    selectOnLineNumbers: true,
  };

  useEffect(() => {
    document.title = "Welcome!";
  }, []);
  return (
    <div>
      <div id="bg">
        {/*<img src='bgimg.jpeg'></img>*/}
        <ParticlesBg type="lines" bg={true} />
      </div>

      <Link to="/" id="tohome">
        <img src="logo.png"></img>
      </Link>

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

      <div>
        <GithubCorner
          href="https://github.com/saisree27/speechtocode"
          bannerColor="#70B7FD"
        />
      </div>

      <center>
        <p className="position-relative fs-1 text-white fw-light font-monospace  title mt-5">
          Welcome to Speech-To-Code!
        </p>
      </center>

      {/*<h2 className='title'>Purpose</h2>*/}
      <div>
        <center>
          <p className="position-relative text-justify text-white fw-light font-monospace  mb-5 mt-4 abouttext">
            This website is intended to help beginner coders learn the
            fundemental syntax of programming languages. It translated English
            phrases spoken by the user into functional code. The user has the
            option to translate their English phrases into Java, Python, or
            JavaScript.
          </p>
        </center>
      </div>
      <center className="mt-2">
        <Link to="/learn">
          <button
            id="startButton"
            className="me-5 btn btn-info fw-light font-monospace"
          >
            {" "}
            Use the Tool
          </button>
        </Link>
        <Link to="/tutorial">
          <button
            id="tutorialButton"
            className="ms-2 btn btn-secondary fw-light font-monospace"
          >
            Follow Tutorial
          </button>
        </Link>
      </center>
      {/*<div><center><p  className='abouttext'>*insert stuff and developed by here*</p></center></div>
        <div><center><p  className='abouttext'>*insert stuff and developed by here*</p></center></div>*/}
      {/*<h2 className='title'>Creators</h2>
        <div><center><p  className='abouttext'>This project was created by Saigautam Bonam, Nicholas Cai, Kinshuk Phalke, and Dhruv Sharma.</p></center></div>*/}
      <footer className="footer">
        <div className="text-center">
          <p className="fw-light font-monospace">
            <strong>Speech2Code</strong> by Saigautam Bonam, Nicolas Cai,
            Kinshuk Phalke, and Dhruv Sharma.
          </p>
        </div>
      </footer>
    </div>
  );
}
