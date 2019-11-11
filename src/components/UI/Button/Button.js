import React from "react";
import styled from "./Button.module.css";

const Button = props => {
  return (
    <button
      className={[styled.Button, styled[props.buttonType]].join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default Button;
