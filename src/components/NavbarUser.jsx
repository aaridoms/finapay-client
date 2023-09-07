import { useContext, useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  NavbarMenu,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  
} from "@nextui-org/react";
import { isMobile } from 'react-device-detect';
import defaultPic from "../assets/defaultPic.webp";
import logoImg from "../assets/finapayLogoSinFondo.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";

export default function App() {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState();

  const {  verifyToken } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/account/profile");
      // console.log(response.data);
      setUserProfile(response.data);
      // getData();
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    verifyToken();
    navigate("/");
  };

  if (userProfile === undefined) {
    return <h3>BUSCANDO</h3>;
  }

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/account/summary" color="dark-blue">
          <img
            src={logoImg}
            alt="logo"
            fill="none"
            viewBox="0 0 32 32"
            width="150"
          />
        </Link>
      </NavbarBrand>

      <NavbarContent className="sm:flex gap-4" justify="left">
        <NavbarItem>
          <Link color="foreground" href="/account/expenses">
            EXPENSES
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/account/summary" aria-current="page" color="dark-blue">
            HOME
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/account/investment">
            INVESTMENT
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="profilePic"
              size="sm"
              src={userProfile.profilePic || defaultPic}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2" textValue="hola">
              <p className="font-semibold">Signed in as </p>
              <p className="font-semibold">{userProfile.email}</p>
            </DropdownItem>
            <DropdownItem key="profile" className="gap-2" color="success" textValue="hola">
              <p className="font-semibold" style={{color: "green"}}>{userProfile.funds} €</p>
            </DropdownItem>
            <DropdownItem
              key="settings"
              onClick={() => {
                navigate("/account/profile");
              }}
            >
              <p style={{color:"#c3b169"}}>My Settings</p>
            </DropdownItem>
            <DropdownItem onClick={handleLogout} key="logout" color="danger">
              <p style={{color: "red"}}>Logout</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
