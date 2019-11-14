import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

import { Route } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = param[1];
    }

    if (Object.keys(ingredients).length > 0) {
      this.setState({ ingredients });
    }

    console.log(this.state.ingredients);
  }

  cancelHandler = () => {
    this.props.history.push("/");
  };

  proceedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        {!this.state.ingredients ? (
          <h3>Please first build a burger</h3>
        ) : (
          <CheckoutSummary
            ingredients={this.state.ingredients}
            checkoutCanceled={this.cancelHandler}
            checkoutProceeded={this.proceedHandler}
          />
        )}

        <Route
          path={this.props.match.url + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

export default Checkout;
