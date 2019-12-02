import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import styled from "./NavigationItems.module.css";

const NavigationItems = () => {
  return (
    <ul className={styled.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/auth">Log in</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
