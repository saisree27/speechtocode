import "../css/main.css";

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
