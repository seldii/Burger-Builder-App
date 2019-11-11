import React, { Component, Fragment } from "react";
import styled from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    isSideDrawerOpen: false
  };
  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { isSideDrawerOpen: !prevState.isSideDrawerOpen };
    });
  };
  render() {
    return (
      <Fragment>
        <Toolbar sideDrawerHandler={this.sideDrawerToggleHandler} />
        <SideDrawer
          show={this.state.isSideDrawerOpen}
          sideDrawerHandler={this.sideDrawerToggleHandler}
        />
        <main className={styled.content}>{this.props.children}</main>
      </Fragment>
    );
  }
}
export default Layout;
