import React from "react";
import styled from "./Backdrop.module.css";

const Backdrop = props => {
  return props.show ? (
    <div className={styled.Backdrop} onClick={props.clicked}></div>
  ) : null;
};

export default Backdrop;
