import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styled from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Forms/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        config: { validation: { required: true }, valid: false, touched: false }
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        config: { validation: { required: true }, valid: false, touched: false }
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",

        config: { validation: { required: true }, valid: false, touched: false }
      },
      postCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "PostCode"
        },
        value: "",
        config: { validation: { required: true }, valid: false, touched: false }
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        config: { validation: { required: true }, valid: false, touched: false }
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "",
              displayValue: "Select your delievery method",
              disabled: true,
              selected: true,
              hidden: true
            },
            { value: "Green", displayValue: "No Disposable Cutlery" },
            { value: "Bio", displayValue: "Bio" },
            { value: "Fast", displayValue: "Fast (+ $1)" }
          ]
        },
        value: "",
        config: {
          validation: { required: true },
          //Show the validation feedback only if the user start typing
          touched: false,
          valid: false
        }
      }
    },
    formIsValid: false,
    isLoading: false
  };
  orderHandler = e => {
    e.preventDefault();
    const orderFormData = {};
    for (let elementIdentifier in this.state.orderForm) {
      orderFormData[elementIdentifier] = this.state.orderForm[
        elementIdentifier
      ].value;
    }
    this.setState({ isLoading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderContactData: orderFormData
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

  onChangedHandler = (event, inputIdentifier) => {
    //Change the state immutabely
    const orderForm = { ...this.state.orderForm };
    //Deeply clone the objects inside the orderform object as well
    const updatedElement = { ...orderForm[inputIdentifier] };
    updatedElement.value = event.target.value;
    //Show the validation feedback only if the user start typing through "touched" property
    updatedElement.config.touched = true;
    updatedElement.config.valid = this.validationCheck(
      updatedElement.value,
      updatedElement.config.validation
    );
    orderForm[inputIdentifier] = updatedElement;
    //Check if whole form is valid
    let formIsValid = true;
    for (let inputIdentifier in orderForm) {
      formIsValid = orderForm[inputIdentifier].config.valid && formIsValid;
    }
    console.log(formIsValid);
    this.setState({ orderForm, formIsValid });
  };

  validationCheck = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      //trim to get rid of the white space
      isValid = value.trim() !== "" && isValid; //check the prev state of isValid to make sure that it was true for all the rules
    }
    return isValid;
  };
  render() {
    const { orderForm } = this.state;
    const formElementArray = [];
    for (let key in orderForm) {
      formElementArray.push({
        id: key,
        elementType: orderForm[key].elementType,
        elementConfig: orderForm[key].elementConfig,
        value: orderForm[key].value,
        config: orderForm[key].config
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(element => (
          <Input
            key={element.id}
            elementType={element.elementType}
            elementConfig={element.elementConfig}
            value={element.value}
            changed={event => this.onChangedHandler(event, element.id)}
            invalid={!element.config.valid}
            touched={element.config.touched}
          />
        ))}
        <Button buttonType="Success" disabled={!this.state.formIsValid}>
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
