import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../components/UI/Forms/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import styled from "./Auth.module.css";
import * as actionCreators from "../../store/actions/index";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: { required: true, isEmail: true },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: { required: true, minLength: 6 },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  };

  validationCheck = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      //trim to get rid of the white space
      isValid = value.trim() !== "" && isValid; //check the prev state of isValid to make sure that it was true for all the rules
    }
    if (rules.isEmail) {
      const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.isNumeric) {
      const pattern = /^\+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.validationCheck(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };

    this.setState({ controls: updatedControls });
  };
  submitHandler = event => {
    event.preventDefault();
    const { email, password } = this.state.controls;
    const { isSignUp } = this.state;
    console.log(["isSignUp"], isSignUp);
    this.props.onAuth(email.value, password.value, isSignUp);
  };

  toggleAuthMode = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      };
    });
  };
  render() {
    const { controls } = this.state;
    const formElementArray = [];
    for (let key in controls) {
      formElementArray.push({
        id: key,
        config: controls[key]
      });
    }
    let form = (
      <React.Fragment>
        <form onSubmit={this.submitHandler}>
          {formElementArray.map(element => {
            return (
              <Input
                key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                changed={event => this.inputChangeHandler(event, element.id)}
                invalid={!element.config.valid}
                touched={element.config.touched}
              />
            );
          })}{" "}
          <Button buttonType="Success">
            {this.state.isSignUp ? "Sign up" : "Log in"}
          </Button>
        </form>
        <Button buttonType="Danger" clicked={this.toggleAuthMode}>
          Switch to{this.state.isSignUp ? " Login" : " Sign up"}
        </Button>
      </React.Fragment>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    let errMsg = null;
    if (this.props.error) {
      errMsg = <p style={{ color: "red" }}>{this.props.error.message}</p>;
    }

    return (
      <div className={styled.Auth}>
        {errMsg}
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    userId: state.auth.userId,
    idToken: state.auth.idToken,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actionCreators.auth(email, password, isSignUp))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
