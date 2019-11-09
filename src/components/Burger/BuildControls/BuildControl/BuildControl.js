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
        Less
      </button>
      <button onClick={props.add} className={styled.More}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
