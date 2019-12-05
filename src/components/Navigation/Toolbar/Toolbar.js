import React from "react";
import styled from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = props => {
  return (
    <header className={styled.Toolbar}>
      <DrawerToggle sideDrawerHandler={props.sideDrawerHandler} />
      <div className={styled.Logo}>
        <Logo />
        <div className={styled.Header}>
          <p>Seldii's Vegan Burgers</p>
        </div>
      </div>
      <nav className={styled.DesktopOnly}>
        <NavigationItems isAuth={props.isAuthenticated} />
      </nav>
    </header>
  );
};

export default Toolbar;
