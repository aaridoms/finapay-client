import { useContext, useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuItem,
  NavbarMenu,
  Divider,
} from "@nextui-org/react";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import { NavLink, useNavigate } from "react-router-dom";
import logoImg from "../assets/finapayLogoSinFondo.png";
import Footer from "./Footer"

export default function NavBarUserMovile() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className=" sm:flex gap-4" justify="center">
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
                setIsMenuOpen(false);
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

      <NavbarMenu>
        <NavbarMenuItem className="flex flex-col content-between	 gap-4 ">
          <div className="flex flex-col content-center gap-4 " style={{marginTop:"30px"}}>
            <NavLink
              style={{color:"#0070F0", fontSize:"bold"}}
              size="lg"
              underline="hover"
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                navigate("/account/summary");
              }}
            >
              SUMMARY
            </NavLink>
            <NavLink
              className="w-full"
              style={{color:"#0070F0", fontSize:"bold"}}
              size="lg"
              underline="hover"
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                navigate("/account/expenses");
              }}
            >
              EXPENSES
            </NavLink>
            <NavLink
              className="w-full"
              style={{color:"#0070F0", fontSize:"bold"}}
              size="lg"
              underline="hover"
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                navigate("/account/investment");
              }}
            >
              INVESTMENT
            </NavLink>
          </div>
          <div style={{marginTop:"350px"}}>
            <Divider/>
          <Footer/>

          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
