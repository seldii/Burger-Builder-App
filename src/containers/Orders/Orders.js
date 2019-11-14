import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    isLoading: true
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then(res => {
        const orders = [];
        for (let orderKey in res.data) {
          orders.push({ ...res.data[orderKey], key: orderKey });
        }
        this.setState({ orders, isLoading: false });
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.key}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
