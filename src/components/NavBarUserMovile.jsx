import { useContext, useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Progress,
  Avatar,
  NavbarMenuItem,
  NavbarMenu,
  Divider,
} from "@nextui-org/react";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import { NavLink, useNavigate } from "react-router-dom";
import logoImg from "../assets/finapayLogoSinFondo.png";
import defaultPic from "../assets/defaultPic.webp";
import Footer from "./Footer"

// Este es el navbar que hay después de loguearse en mobile (responsive) iyilizando isMobile de react-device-detect
export default function NavBarUserMovile() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userFunds,setUserFunds] = useState(0)
 
  const [userProfile, setUserProfile] = useState([]);
  const { verifyToken } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/account/profile");
      setUserProfile(response.data);
      setUserFunds(response.data.funds.toFixed(2))
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
    return <Progress
    size="sm"
    isIndeterminate
    
    className="max-w-md"
    style={{paddingTop: "10px",display:"flex" , justifyContent:"center",}}
  />;
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
            <DropdownItem key="profile" className="gap-2" color="success" textValue="hola">
              <p className="font-semibold" style={{color: "#18C964"}}>Your Funds: {userFunds}€</p>
            </DropdownItem>
            <DropdownItem
              key="settings"
              onClick={() => {
                navigate("/account/profile");
              }}
            >
              <p >My Settings</p>
            </DropdownItem>
            <DropdownItem onClick={handleLogout} key="logout" color="danger">
              <p style={{color: "red"}}>Logout</p>
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
