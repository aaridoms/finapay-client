import { redirect, useNavigate } from "react-router-dom";
import { useState } from "react";
import service from "../services/service.config";

export default function Signup() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repitPassword, setRepitPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRepeatPasswordChange = (e) => setRepitPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await service.post("/auth/signup",{
        username,
        email,
        password,
        repitPassword
      })
      navigate("/login")


    } catch (error) {
      if(error.response && error.response.status === 400){
        setErrorMessage(error.response.data.errorMessage)
      } else {
        console.log(error)
        navigate("/error")
      }
    }



  }

  return (
    <div>
      <h1>Sign Up</h1>

      <form onSubmit={handleSignup}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <br />

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
        <label>Repeat Password:</label>
        <input
          type="password"
          name="repitPassword"
          value={repitPassword}
          onChange={handleRepeatPasswordChange}
        />

        <button type="submit">Signup</button>
        {errorMessage ? <p> {errorMessage}</p> : null}
      </form>
    </div>
  );
}
