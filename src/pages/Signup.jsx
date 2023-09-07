import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import service from "../services/service.config";
import { EyeFilledIcon } from "../components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon";

export default function Signup() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleTwo, setIsVisibleTwo] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityTwo = () => setIsVisibleTwo(!isVisibleTwo);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repitPassword, setRepitPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRepeatPasswordChange = (e) => setRepitPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await service.post("/auth/signup", {
        username,
        email,
        password,
        repitPassword,
      });
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        console.log(error);
        navigate("/error");
      }
    }
  };

  return (
    <div role="form" className="flex flex-col gap-4 items-center text-center">
      <div className="flex flex-col gap-4">
        <h3 className="text-default-500 text-sm">SIGN UP</h3>
        <div className="flex w-full flex-wrap items-end mb-6 gap-4">
          <Input
            aria-label="Username"
            key="username"
            type="text"
            label="Username"
            labelPlacement="outside"
            value={username}
            onChange={handleUsernameChange}
            className="flex-grow"
          />
          <Input
            aria-label="Email"
            key="email"
            type="email"
            label="Email"
            labelPlacement="outside"
            value={email}
            onChange={handleEmailChange}
            className="flex-grow"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-wrap items-end mb-6 gap-4">
          <Input
            aria-label="Password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            className="flex-grow"
            endContent={
              <button
                aria-label="Toggle password visibility"
                className="outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <Input
            aria-label="Repeat Password"
            label="Repeat Password"
            placeholder="Repeat your Password"
            value={repitPassword}
            onChange={handleRepeatPasswordChange}
            className="flex-grow"
            endContent={
              <button
                aria-label="Toggle repeat password visibility"
                className="outline-none"
                type="button"
                onClick={toggleVisibilityTwo}
              >
                {isVisibleTwo ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisibleTwo ? "text" : "password"}
          />
        </div>
        <div className="flex w-full flex-wrap items-center mb-6 gap-4">
          <Button
            role="button"
            aria-label="Signup"
            type="submit"
            onClick={handleSignup}
            className="flex-grow"
          >
            Signup
          </Button>
        </div>
        {errorMessage ? <p className="text-center" style={{color:"red"}}> {errorMessage}</p> : null}
      </div>
    </div>
  );
}
