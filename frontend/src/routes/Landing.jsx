import "../css/landing.css";
import { Link } from "react-router-dom";

/**
 * Landing page of application
 * Associated with route "/"
 */
export default function Landing() {
  return (
    <div style={{
      backgroundImage: "url(/bgimg.jpeg)",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
      }}>
      <div>
          <Link to="/" id='tohome'>
          <h4 id='icontext'>Speech2Code</h4>
          <img src='mic.png'></img>
        </Link>
      </div>
      <center>
      <h1 className='title'>Welcome to Speech-To-Code!</h1>
      <Link to="/learn"><button> Use the Tool</button></Link>
      <br />
      <br />
      <Link to="/tutorial"><button>Follow Tutorial</button></Link>
      </center>
      <div><center><p  className='abouttext'>*insert stuff and developed by here*</p></center></div>
    </div>
  );
}
