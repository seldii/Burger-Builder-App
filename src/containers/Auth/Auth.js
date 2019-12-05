import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Forms/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import styled from "./Auth.module.css";
import * as actionCreators from "../../store/actions/index";
import { validationCheck } from "../../shared/utility";

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
  componentDidMount() {
    //if the user is not building a burger reset the path for redirection
    if (!this.props.burgerBuilding && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath("/");
    }
  }

  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: validationCheck(
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

    //Redirect the user once they are authenticated
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={styled.Auth}>
        {errMsg}
        {form}
        {authRedirect}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error,
    burgerBuilding: state.burgerBuilder.burgerBuilding,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actionCreators.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: path =>
      dispatch(actionCreators.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
