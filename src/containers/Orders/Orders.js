import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    const { token, userId } = this.props;
    this.props.onFetchOrders(token, userId);
  }
  render() {
    let orders = this.props.loading ? (
      <Spinner />
    ) : (
      <div>
        {this.props.orders.map(order => (
          <Order
            key={order.key}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
    return orders;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actionCreators.fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
