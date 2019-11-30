import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";

class Checkout extends Component {
  cancelHandler = () => {
    this.props.history.push("/");
  };

  proceedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/"></Redirect>;
    if (this.props.ingredients) {
      summary = (
        <React.Fragment>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCanceled={this.cancelHandler}
            checkoutProceeded={this.proceedHandler}
          />
          <Route
            path={this.props.match.url + "/contact-data"}
            component={ContactData}
          />
        </React.Fragment>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return { ingredients: state.burgerBuilder.ingredients };
};

export default connect(mapStateToProps, null)(Checkout);
