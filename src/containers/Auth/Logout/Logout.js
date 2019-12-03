import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";

export class Logout extends Component {
  render() {
    return <div></div>;
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actionCreators.logout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
