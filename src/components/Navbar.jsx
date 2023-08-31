
import { Link } from "react-router-dom";


export default function Navbar() {


 

  return (
    <nav>
      <Link to={"/"}>HOME</Link>
      <br />
      <Link to={"/login"}>LOGIN</Link>
      <br />
      <Link to={"/signup"}>SIGNUP</Link>
      <br />
     
    </nav>
  );
}
