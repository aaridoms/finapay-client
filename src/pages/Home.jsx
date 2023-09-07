import Login from "../components/Login";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="main-container back-home" style={{borderRadius:"20px"}}>
      <h1 className="main-title" style={{ color: "white",fontSize:"2rem",paddingTop:"60px" }}>
        WELCOME TO FINAPAY
      </h1>

      <Button
        style={{margin:"40px",backgroundColor:"white", color:"blue"}}
        
        variant="faded"
        onClick={() => navigate("/signup")}
      >
        Sign Up for Free
      </Button>
      <Login />
      <footer>
       
      </footer>
    </div>
  );
}
