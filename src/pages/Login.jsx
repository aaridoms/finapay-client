import { useContext,useState } from "react";
import {AuthContext} from "../context/auth.context"
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";


export default function Login(){
 
  const {verifyToken} = useContext(AuthContext)
  const navigate = useNavigate()

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      
      const response = await service.post("/auth/login",{
        email,
        password
      })

      localStorage.setItem("authToken", response.data.authToken)
      await verifyToken()
      navigate("/account/summary")
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        console.log(error);
        navigate("/error");
      }
    }


  }

  return (
    <div>
      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Login</button>

        {errorMessage ? <p> {errorMessage}</p> : null}
      </form>
    </div>
  );
}
