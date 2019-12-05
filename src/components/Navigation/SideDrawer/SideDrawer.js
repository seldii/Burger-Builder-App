import React, { Fragment } from "react";
import styled from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = props => {
  //Switch between Close and Open css classes asigned in css file
  let status;
  if (props.show) {
    status = "Open";
  }
  if (!props.show) {
    status = "Close";
  }
  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.sideDrawerHandler} />
      <div className={[styled.SideDrawer, styled[status]].join(" ")}>
        <div className={styled.Logo}>
          <Logo height="80%" />
          <div className={styled.Header}>Seldii's Vegan Burgers</div>
        </div>
        <nav>
          <NavigationItems
            clicked={props.sideDrawerHandler}
            isAuth={props.isAuthenticated}
          />{" "}
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
