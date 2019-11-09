import React, { Fragment } from "react";

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map((ingKey, i) => {
    return (
      <li key={ingKey + i}>
        <span style={{ textTransform: "capitalize" }}>{ingKey}</span>(
        {props.ingredients[ingKey]})
      </li>
    );
  });
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>Your yummy burger is ready to order with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout</p>
    </Fragment>
  );
};

export default OrderSummary;
