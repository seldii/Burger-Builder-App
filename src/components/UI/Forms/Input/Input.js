import React from "react";
import styled from "./Input.module.css";

const Input = props => {
  //Adding validation feedback
  const inputClasses = [styled.InputElement];
  let validationError = null;
  //Show the validation feedback only if the user start typing through "touched" property
  if (props.invalid && props.touched) {
    inputClasses.push(styled.Invalid);
    validationError = (
      <p className={styled.ValidationError}>Please enter a valid value!</p>
    );
  }

  let inputElement;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={props.changed}
          className={inputClasses.join(" ")}
          value={props.value}
          defaultValue={props.defaultValue}
        >
          {props.elementConfig.options.map(o => (
            <option
              key={o.value}
              value={o.value}
              disabled={o.disabled}
              hidden={o.hidden}
            >
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
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={styled.Input}>
      <label className={styled.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default Input;
