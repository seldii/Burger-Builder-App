import React, { Fragment, useEffect } from "react";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
  useEffect(() => {
    return () => {
      console.log("[OrderSummary] rendering..");
    };
  }, []);
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
      <p>
        <strong>Total price: $ {props.totalPrice} </strong>
      </p>
      <p>Continue to checkout?</p>
      <Button clicked={props.purchaseHandler} buttonType="Danger">
        Cancel
      </Button>
      <Button clicked={props.proceedToCheckout} buttonType="Success">
        Proceed
      </Button>
    </Fragment>
  );
};

export default React.memo(OrderSummary);
