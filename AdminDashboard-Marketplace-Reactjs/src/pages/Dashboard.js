import React, { useEffect } from "react";
import PlaceholderComponent from "../Components/PlaceholderComponent";
import NavbarComponent from "../Components/NavbarComponent";
import SidebarComponent from "../Components/SidebarComponent";
import ContentwraperComonent from "../Components/ContentwraperComonent";
import ControlsidebarComponent from "../Components/ControlsidebarComponent";
import FooterComponent from "../Components/FooterComponent";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate= useNavigate()
  useEffect(() => {
    if (!localStorage.auth_token) {
      navigate('/login')
    }
  }, [])
  

  return (
    <div className=" dark-mode hold-transition sidebar-mini layout-footer-fixed">

    <div className="wrapper">
      <PlaceholderComponent />
      <NavbarComponent />
      <SidebarComponent />
      <ContentwraperComonent />
      <ControlsidebarComponent />
      <FooterComponent />
    </div>
    </div>
  );
}
