import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";

class Checkout extends Component {
  cancelHandler = () => {
    this.props.history.push("/");
  };

  proceedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        {!this.props.ingredients ? (
          <h3>Please first build a burger</h3>
        ) : (
          <React.Fragment>
            <CheckoutSummary
              ingredients={this.props.ingredients}
              checkoutCanceled={this.cancelHandler}
              checkoutProceeded={this.proceedHandler}
            />{" "}
            <Route
              path={this.props.match.url + "/contact-data"}
              component={ContactData}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ingredients: state.ingredients };
};

export default connect(mapStateToProps, null)(Checkout);
