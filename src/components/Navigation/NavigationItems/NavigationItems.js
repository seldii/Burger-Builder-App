import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import styled from "./NavigationItems.module.css";

const NavigationItems = () => {
  return (
    <ul className={styled.NavigationItems}>
      <NavigationItem link="/" active>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/checkout">Checkout</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
