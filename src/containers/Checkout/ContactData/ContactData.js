import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styled from "./ContactData.module.css";
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postCode: ""
    }
  };
  render() {
    return (
      <div className={styled.ContactData}>
        <h4>Please enter the delivery address and contact details</h4>
        <form>
          <input type="text" name="name" placeholder="Your name" />
          <input type="text" name="email" placeholder="Your email" />
          <input type="text" name="street" placeholder="Street" />
          <input type="text" name="postCode" placeholder="Post code" />
          <Button buttonType="Success">Order</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
