import Login from "../components/Login";
import { Button, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import iphone1 from "../assets/iphone-15-finapay1.png";
import iphone2 from "../assets/iphone-15-finapay2.png";
import { isMobile } from "react-device-detect";
// Este componente muestra la home page de la app y permite al usuario loguearse o registrarse
export default function Home() {
  const navigate = useNavigate();
  const { isUserActive } = useContext(AuthContext);

  useEffect(() => {
    if (isUserActive === true) {
      navigate("/account/summary");
    }
  }, [isUserActive, navigate]);

  return (
    <div>
      <div
        className="main-container back-home"
        style={{ borderRadius: "20px"}}
      >
        <h1
          className="main-title"
          style={{ color: "white", fontSize: "2rem", paddingTop: "60px" }}
        >
          WELCOME TO FINAPAY
        </h1>

        <Button
          style={{ margin: "40px", backgroundColor: "white", color: "blue" }}
          variant="faded"
          onClick={() => navigate("/signup")}
        >
          Sign Up for Free
        </Button>
        <div style={{display:"flex", justifyContent:"center", marginBottom:"10px"}}>
        <p  style={{backgroundColor:"black", width:"max-content",borderRadius:"10px"}}>Use test@test.com Test1234 for quick view of the content</p>

        </div>
        <Login />
      </div>
      <hr style={{marginTop:"40px"}}/>
      <div style={{ display:"flex", justifyContent:"center", marginTop: "40px" }}>
      <iframe width="600" height="315" src="https://www.youtube.com/embed/_HUTVUn1VKE?si=KXEk7nR12fUagVeU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen controls="0"></iframe>

      </div>
      
<hr style={{marginTop:"40px"}}/>
      {isMobile ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            className="main-title"
            style={{ color: "white", fontSize: "1.5rem", paddingTop: "30px" }}
          >
            ENPOWER YOUR FINANCES
          </h1>
          <Image isZoomed src={iphone1} alt="" width={"300px"} style={{borderRadius:"35px"}}/>

          <h1
            className="main-title"
            style={{ color: "white", fontSize: "1.5rem", paddingTop: "30px" }}
          >
            INSTANT TRANSACTIONS
          </h1>
          <Image isZoomed src={iphone2} alt="" width={"300px"} style={{borderRadius:"35px"}} />

          <h1
            className="main-title"
            style={{ color: "white", fontSize: "1.5rem", paddingTop: "30px"  }}
          >
            MANAGE YOUR EXPENSES
          </h1>
        </div>
      ) : (
        
        <div
          className="flex gap-4 justify-between pt-4"
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            paddingTop:"40px"
          }}
        >
          <Image isZoomed src={iphone1} alt="" width={"370px"} style={{borderRadius:"35px"}}/>
          <h1
            className="main-title"
            style={{ color: "white", fontSize: "1.5rem", paddingTop: "30px" }}
          >
            ENPOWER YOUR FINANCES
          </h1>
          <h1
            className="main-title"
            style={{ color: "white", fontSize: "1.5rem", paddingTop: "30px" }}
          >
            MANAGE YOUR EXPENSES
          </h1>
          <Image isZoomed src={iphone2} alt="" width={"370px"}  style={{borderRadius:"35px"}}/>
          
        </div>
      )}
      <hr style={{marginTop:"40px"}}/>
    </div>
  );
}
