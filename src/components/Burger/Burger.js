import React from "react";
import styled from "./Burger.module.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

function Burger(props) {
  let burgerIngredients = Object.keys(props.ingredients)
    .map(ingredientKey => {
      return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
        return (
          <BurgerIngredients key={ingredientKey + i} type={ingredientKey} />
        );
      });
    })
    .reduce((acc, el) => acc.concat(el));

  if (burgerIngredients.length === 0) {
    burgerIngredients = <p>Please start adding the ingredients!</p>;
  }
  return (
    <div className={styled.Burger}>
      <BurgerIngredients type={"bread-top"} />
      {burgerIngredients}
      <BurgerIngredients type={"bread-bottom"} />
    </div>
  );
}

export default Burger;
