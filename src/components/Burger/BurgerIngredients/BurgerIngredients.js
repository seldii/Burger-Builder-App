import React from "react";
import styled from "./BurgerIngredients.module.css";
import PropTypes from "prop-types";

const BurgerIngredients = props => {
  let ingredient = null;

  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={styled.BreadBottom}></div>;
      break;
    case "bread-top":
      ingredient = (
        <div className={styled.BreadTop}>
          <div className={styled.Seeds1}></div>
          <div className={styled.Seeds2}></div>
        </div>
      );
      break;
    case "patty":
      ingredient = <div className={styled.Patty}></div>;
      break;
    case "cheese":
      ingredient = <div className={styled.Cheese}></div>;
      break;
    case "salad":
      ingredient = <div className={styled.Salad}></div>;
      break;
    case "mushroom":
      ingredient = <div className={styled.Mushroom}></div>;
      break;
    default:
      ingredient = null;
  }
  return ingredient;
};

BurgerIngredients.propTypes = {
  type: PropTypes.string
};
export default BurgerIngredients;
