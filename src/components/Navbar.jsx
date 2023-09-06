import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import logoImg from "../assets/finapayLogoSinFondo.png";
import Login from "./Login";
import { isMobile } from "react-device-detect";
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar>
      <NavbarContent style={isMobile ? { display: "flex", justifyContent: "center" } : {} } >
        <Link href="/">
          <img
            src={logoImg}
            alt="logo"
            fill="none"
            viewBox="0 0 32 32"
            width="150"
            className="mx-auto"
          />
        </Link>
      </NavbarContent>

      <NavbarContent justify="end" className={isMobile && "hidden"}>
        <NavbarItem className=" lg:flex">
          <Login />
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
