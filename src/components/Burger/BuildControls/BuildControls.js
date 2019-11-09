import React from "react";
import PropTypes from "prop-types";
import styled from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Patty", type: "patty" },
  { label: "Cheese", type: "cheese" },
  { label: "Mushroom", type: "mushroom" }
];

const BuildControls = props => {
  return (
    <div className={styled.BuildControls}>
      <p>
        Current Price: <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      {controls.map((control, i) => {
        return (
          <BuildControl
            key={control.type + i}
            add={() => props.addIngredient(control.type)}
            remove={() => props.removeIngredient(control.type)}
            label={control.label}
            disabled={props.disabledButtonInfo[control.type]}
          />
        );
      })}
    </div>
  );
};

BuildControls.propTypes = {};

export default BuildControls;
