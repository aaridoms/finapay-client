import { useContext } from "react";
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
import logoImg from "../assets/finapayLogoSinFondo.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
export default function App() {

    const navigate = useNavigate()

    const {isUserActive, verifyToken} = useContext(AuthContext)
    const handleLogout = () => {
        localStorage.removeItem("authToken")
        verifyToken()
        navigate("/")
      }


  return (
    <Navbar>
      <NavbarBrand>
        <img
          src={logoImg}
          alt="logo"
          fill="none"
          viewBox="0 0 32 32"
          width="150"
        />
      </NavbarBrand>

      <NavbarContent className="sm:flex gap-4" justify="left">
        <NavbarItem>
          <Link color="foreground" href="#">
            EXPENSES
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/account/summary" aria-current="page" color="dark-blue">
            HOME
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
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
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as </p>
              <p className="font-semibold">EMAIL@EXAMPLE.COM</p>
            </DropdownItem>
            <DropdownItem key="settings" onClick={()=>{ navigate("/account/profile")}}>My Settings</DropdownItem>
            <DropdownItem onClick={handleLogout} key="logout" color="danger">
                Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
