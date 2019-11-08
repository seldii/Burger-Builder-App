import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";

class BurgerBilder extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <Burger />
        <div>Build Control</div>
      </Fragment>
    );
  }
}

export default BurgerBilder;
