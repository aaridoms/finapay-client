import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function Navbar() {

  const navigate = useNavigate()
  const {isUserActive, verifyToken} = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    verifyToken()
    navigate("/")
  }

  return (
    <nav>
      <Link to={"/"}>HOME</Link>
      <br />
      <Link to={"/login"}>LOGIN</Link>
      <br />
      <Link to={"/signup"}>SIGNUP</Link>
      <br />
      {isUserActive === true && <button onClick={handleLogout}>LOGOUT</button>}
    </nav>
  );
}
