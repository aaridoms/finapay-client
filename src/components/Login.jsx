import { useContext, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
 } from "@nextui-org/react";
import { MailIcon } from "./MailIcon.jsx";
import { LockIcon } from "./LockIcon.jsx";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { isMobile } from "react-device-detect";

// verificamos si el usuario está logueado o no con el token
export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { verifyToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  
  const handleIsChecked = (e) => setIsChecked(e.target.checked);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await service.post("/auth/login", {
        email,
        password,
        isChecked,
      });

      localStorage.setItem("authToken", response.data.authToken);
      await verifyToken();
      navigate("/account/summary");
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
    <div>
      <Button onPress={onOpen} color="primary" >
        Log In
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement={isMobile?"top-center":"center"} style={{ backgroundColor: "#18181b", color: "#fff" }} backdrop="opaque">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                    checked={isChecked}
                    onChange={handleIsChecked}
                  >
                    <p style={{color: "#fff"}}>Remember me</p>
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleLogin} onPress={onClose}>
                  Login
                </Button>
              </ModalFooter>
              {errorMessage ? <p style={{color: "red", display: "flex", justifyContent: "center", paddingBottom: "5px"}}> {errorMessage}</p> : null}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
