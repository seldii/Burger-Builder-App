import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import styled from "./NavigationItems.module.css";

const NavigationItems = props => {
  return (
    <ul className={styled.NavigationItems} onClick={props.clicked}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {props.isAuth ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {!props.isAuth ? (
        <NavigationItem link="/auth">Sign in</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Log out</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
