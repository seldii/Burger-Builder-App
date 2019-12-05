import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import styled from "./Logo.module.css";

const Logo = props => {
  return (
    <div className={styled.Logo} style={{ heigth: props.height }}>
      <img
        style={{ width: props.height }}
        src={burgerLogo}
        alt="Seldii's Burger"
      ></img>
    </div>
  );
};

export default Logo;
