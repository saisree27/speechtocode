import "../css/main.css";
import { Link } from "react-router-dom";

/**
 * Main page (where our record button and text editor will show up)
 * Associated with route "/learn" (change in index.js)
 */
export default function Main() {
  return (
    <div>
      <div id='bg'>
        <img src='bgimg.jpeg'></img>
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
      <div> {/*div for embedded text editor*/}
        
        
      </div>
      <div>

      </div>
    </div>
  );
}
