import "../css/landing.css";
import { Link } from "react-router-dom";
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

/**
 * Landing page of application
 * Associated with route "/"
 */
export default function Landing() {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  )

  const options = {
    selectOnLineNumbers: true
  };
  
  useEffect(() => {
    document.title = "Welcome!"
  }, [])
  return (
    <div>
      <div id='bg'>
        <img src='bgimg.jpeg'></img>
      </div>

        <div className="topnav">
          <a className="active" href="/">Home</a>
          <a className="active" href="/learn">Speech-To-Code</a>
          <a className="active" href="/tutorial">Tutorial</a>
        </div>


        <div>
            <Link to="/" id='tohome'>
            <h4 id='icontext'>Speech2Code</h4>
            <img src='mic.png'></img>
          </Link>
        </div>
        <center>
        <h1 className='title'>Welcome to Speech-To-Code!</h1>
        <Link to="/learn"><button id = 'startButton'> Use the Tool</button></Link>
        <br />
        <br />
        <Link to="/tutorial"><button id = 'tutorialButton'>Follow Tutorial</button></Link>
        </center>
        <br />

        <h2 className='title'>Purpose</h2>
        <div><center><p  className='abouttext'>This website is intended to help beginner coders learn the fundemental syntax 
        of programming languages. It translated English phrases spoken by the user into functional code. The user has the option 
        to translate their English phrases into</p></center></div>
        <div><center><p  className='abouttext'>*insert stuff and developed by here*</p></center></div>
        <div><center><p  className='abouttext'>*insert stuff and developed by here*</p></center></div>
        <h2 className='title'>Creators</h2>
        <div><center><p  className='abouttext'>This project was created by Saigautam Bonam, Nicholas Cai, Kinshuk Phalke, and Dhruv Sharma.</p></center></div>
        <div><center><p  className='abouttext'>*insert stuff and developed by here*</p></center></div>
        <div><center><p  className='abouttext'>*insert stuff and developed by here*</p></center></div>
        <div><center><p  className='abouttext'>*insert stuff and developed by here*</p></center></div>
        <div><center><p  className='abouttext'>*insert stuff and developed by here*</p></center></div>
        <div><center><p  className='abouttext'>*insert stuff and developed by here*</p></center></div>
        <div><center><p  className='abouttext'>*insert stuff and developed by here*</p></center></div>
        <div><center><p  className='abouttext'>*insert stuff and developed by here*</p></center></div>

      </div>
  );
}
