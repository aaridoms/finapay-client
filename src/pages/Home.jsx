import Login from "../components/Login";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";

// Este componente muestra la home page de la app y permite al usuario loguearse o registrarse
export default function Home() {

  const navigate = useNavigate()
  const { isUserActive } = useContext(AuthContext);

  useEffect(() => {
    if(isUserActive === true){
      navigate("/account/summary");
    }
  }, [isUserActive, navigate]);

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
