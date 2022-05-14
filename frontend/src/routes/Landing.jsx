import "../css/landing.css";
import { Link } from "react-router-dom";

/**
 * Landing page of application
 * Associated with route "/"
 */
export default function Landing() {
  return (
    <div>
      <center>
      <h1>Landing Page</h1>
      <Link to="/learn">Use the Tool</Link>
      <br />
      <br />
      <Link to="/tutorial">Follow Tutorial</Link>
      </center>
    </div>
  );
}
