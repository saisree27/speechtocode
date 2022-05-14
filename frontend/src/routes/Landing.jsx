import "../css/landing.css";
import { Link } from "react-router-dom";
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

/**
 * Landing page of application
 * Associated with route "/"
 */
export default function Landing() {
  useEffect(() => {
    document.title = "Welcome!"
  }, [])
  return (
    <div style={{
      backgroundImage: "url(/bgimg.jpeg)",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
      }}>

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
        <Link to="/tutorial"><button id = 'startButton'>Follow Tutorial</button></Link>
        </center>
        <div><center><p  className='abouttext'>*insert stuff and developed by here*</p></center></div>
      </div>
  );
}
