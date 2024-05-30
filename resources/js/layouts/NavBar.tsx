import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem,  Button} from "@nextui-org/react";
// import {AcmeLogo} from "./AcmeLogo.jsx";
import { Link } from "react-router-dom";

export default function AppNav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link to={"/"} className="font-bold text-2xl">GéoReference</Link>
          <p className="font-bold text-inherit"></p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" to="/itineraire">
            Itineraires
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to="/myitineraire">
            myItineraire
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link to="/carte" aria-current="page">
            Cartes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to="/">
            Globes
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <a href="/login">Login</a>
        </NavbarItem>
        <NavbarItem>
          <a  href="/register"  className="rounded bg-blue-600 text-gray-100 font-bold p-2">
            Créer un compte
          </a>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              to="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
