import React from "react";

import styled from "./DrawerToggle.module.css";

const DrawerToggle = props => {
  return (
    <div onClick={props.sideDrawerHandler} className={styled.DrawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DrawerToggle;
