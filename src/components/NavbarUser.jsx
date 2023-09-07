import { useContext, useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import defaultPic from "../assets/defaultPic.webp";
import logoImg from "../assets/finapayLogoSinFondo.png";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";



export default function App() {
  const navigate = useNavigate();

  const checkActive = (info) => {
    if (info.isActive) {
      return "navLinkHome";
    }
  };

  const [userProfile, setUserProfile] = useState();

  const { verifyToken } = useContext(AuthContext);

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
        <NavLink to={"/account/summary"} color="dark-blue">
          <img
            src={logoImg}
            alt="logo"
            fill="none"
            viewBox="0 0 32 32"
            width="150"
          />
        </NavLink>
      </NavbarBrand>

      <NavbarContent className="sm:flex gap-4 navLink " justify="left">
        <NavbarItem >
          <NavLink className={checkActive} end={true} to={"/account/expenses"}>
            EXPENSES
          </NavLink>
        </NavbarItem>
        
          <NavLink className={checkActive} to={"/account/summary"}>
            HOME
          </NavLink>
        
        <NavbarItem >
          <NavLink className={checkActive} end={true} to={"/account/investment"}>
            INVESTMENT
          </NavLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
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
            <DropdownItem
              key="settings"
              onClick={() => {
                navigate("/account/profile");
              }}
            >
              My Settings
            </DropdownItem>
            <DropdownItem onClick={handleLogout} key="logout" color="danger">
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
