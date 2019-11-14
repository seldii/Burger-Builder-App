import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styled from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postCode: ""
    },
    isLoading: false
  };
  orderHandler = e => {
    e.preventDefault();

    this.setState({ isLoading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Seldi",
        address: {
          street: "Torstrasse",
          postCode: "10564",
          city: "Berlin",
          country: "Germany"
        },
        email: "jo@gmail.com"
      },
      deliveryMethod: "green"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ isLoading: false });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };
  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="text" name="email" placeholder="Your email" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="postCode" placeholder="Post code" />
        <Button buttonType="Success" clicked={e => this.orderHandler(e)}>
          Order
        </Button>
      </form>
    );
    if (this.state.isLoading) {
      form = <Spinner />;
    }
    return (
      <div className={styled.ContactData}>
        <h4>Please enter the delivery address and contact details</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
