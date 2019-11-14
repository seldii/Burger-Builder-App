import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styled from "./CheckoutSummary.module.css";

const CheckoutSummary = props => {
  return (
    <div className={styled.CheckoutSummary}>
      <h1>Enjoy your yum vegan Burger!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button buttonType="Danger" clicked={props.checkoutCanceled}>
        Cancel
      </Button>
      <Button buttonType="Success" clicked={props.checkoutProceeded}>
        Purchase
      </Button>
    </div>
  );
};

export default CheckoutSummary;
