import { useState } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import logoImg from "../assets/finapayLogoSinFondo.png";
import Login from "./Login";
import { isMobile } from "react-device-detect";
import { NavLink, useNavigate } from "react-router-dom";

// Este es el navbar que hay antes de loguearse
export default function App() {

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar>
      <NavbarContent style={isMobile ? { display: "flex", justifyContent: "center" } : {} } >
        <NavLink to={"/"}>
          <img
            src={logoImg}
            alt="logo"
            fill="none"
            viewBox="0 0 32 32"
            width="150"
            className="mx-auto"
          />
        </NavLink>
      </NavbarContent>

      <NavbarContent justify="end" className={isMobile && "hidden"}>
        <NavbarItem className=" lg:flex">
          <Login />
        </NavbarItem>
        <NavbarItem>
        <NavLink>

          
        </NavLink>
          <Button as={Link} color="primary" variant="flat" onClick={() => navigate('/signup')}>
    Sign Up
</Button>
            
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
