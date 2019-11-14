import React from "react";
import styled from "./Order.module.css";

const Order = props => {
  let ingredients = [];
  for (let key in props.ingredients) {
    const ingredient = key + " (" + props.ingredients[key] + ")";
    ingredients.push(ingredient);
  }
  const ingredientsOutput = ingredients.map(i => (
    <span key={i}>{i + " "}</span>
  ));
  return (
    <div className={styled.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong>$ {Number(props.price).toFixed(2)}</strong>{" "}
      </p>
    </div>
  );
};

export default Order;
