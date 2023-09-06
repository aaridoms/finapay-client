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
} from "@nextui-org/react";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/finapayLogoSinFondo.png";

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

      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            className="w-full"
            color="foreground"
            href="/account/summary"
            size="lg"
          >
            SUMMARY
          </Link>
          <Link
            className="w-full"
            color="foreground"
            href="/account/expenses"
            size="lg"
          >
            EXPENSES
          </Link>
          <Link
            className="w-full"
            color="foreground"
            href="/account/investment"
            size="lg"
          >
            INVESTMENT
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
