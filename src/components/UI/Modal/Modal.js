import React from "react";
import styled from "./Modal.module.css";

const Modal = props => {
  return (
    <div
      className={styled.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
    >
      <button onClick={props.modalHandler} className={styled.Close}>
        x
      </button>
      {props.children}
    </div>
  );
};
export default Modal;
