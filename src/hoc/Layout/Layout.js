import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

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
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          sideDrawerHandler={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          show={this.state.isSideDrawerOpen}
          sideDrawerHandler={this.sideDrawerToggleHandler}
        />
        <main className={styled.content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};
export default connect(mapStateToProps)(Layout);
