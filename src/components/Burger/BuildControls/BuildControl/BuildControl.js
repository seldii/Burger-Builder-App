import React from "react";
import styled from "./BuildControl.module.css";

const BuildControl = props => {
  return (
    <div className={styled.BuildControl}>
      <div className={styled.Label}>{props.label}</div>
      <button
        onClick={props.remove}
        className={styled.Less}
        disabled={props.disabled}
      >
        <p>-</p>
      </button>
      <button onClick={props.add} className={styled.More}>
        <p>+</p>
      </button>
    </div>
  );
};

export default BuildControl;
