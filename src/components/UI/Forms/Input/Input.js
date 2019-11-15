import React from "react";
import styled from "./Input.module.css";

const Input = props => {
  let inputElement;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.changed}
          className={styled.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          className={styled.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={props.changed}
          className={styled.InputElement}
          value={props.value}
        >
          {props.elementConfig.options.map(o => (
            <option key={o.value} value={o.value}>
              {o.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.changed}
          className={styled.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={styled.Input}>
      <label className={styled.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
