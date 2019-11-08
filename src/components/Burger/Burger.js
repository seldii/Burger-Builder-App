import React from "react";
import PropTypes from "prop-types";
import styled from "./Burger.module.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

function Burger(props) {
  return (
    <div className={styled.Burger}>
      <BurgerIngredients type="bread-top" />
      <BurgerIngredients type="bread-bottom" />
      <BurgerIngredients type="patty" />
      <BurgerIngredients type="cheese" />
      <BurgerIngredients type="mushroom" />
      <BurgerIngredients type="salad" />
    </div>
  );
}

Burger.propTypes = {};

export default Burger;
