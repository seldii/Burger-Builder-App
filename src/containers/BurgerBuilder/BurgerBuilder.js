import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

export class BurgerBuilder extends Component {
  state = {
    isModalOpen: false
  };
  componentDidMount() {
    /* */
    this.props.initIngredients();
  }

  //disable/enable the ORDER button in BurgerControls Component
  updateOrderState = ingredients => {
    const sum = Object.values(ingredients).reduce((acc, el) => {
      return acc + el;
    }, 0);

    return sum > 0;
  };
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ isModalOpen: !this.state.isModalOpen });
    } else {
      //if the user is not authenticated, simply redirect them to sign in page
      //and change the authredirectpath to redirect them to checkout after authentication
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };
  proceedToCheckout = () => {
    //initiate the purchasing
    this.props.onInitPurchase();

    //Redirect to checkout page
    this.props.history.push("/checkout");
  };

  render() {
    //if the amount of the ingredient equals 0 disable the button
    const disabledButtonInfo = { ...this.props.ingredients };
    for (let key in disabledButtonInfo) {
      disabledButtonInfo[key] = disabledButtonInfo[key] <= 0;
    }

    let burger = <Spinner />;
    let orderSummary = null;

    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={this.props.onIngredientAdd}
            removeIngredient={this.props.onIngredientRemove}
            disabledButtonInfo={disabledButtonInfo}
            totalPrice={this.props.totalPrice}
            canBeOrdered={this.updateOrderState(this.props.ingredients)}
            modalHandler={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
          purchaseHandler={this.purchaseHandler}
          proceedToCheckout={this.proceedToCheckout}
          ingredients={this.props.ingredients}
          totalPrice={this.props.totalPrice}
        ></OrderSummary>
      );
    }
    if (this.props.error) {
      burger = (
        <p style={{ textAlign: "center" }}>Ingredients can't be loaded</p>
      );
    }

    if (this.state.isLoading) {
      orderSummary = <Spinner />;
    }

    return (
      <Fragment>
        {burger}
        <Modal
          show={this.state.isModalOpen}
          modalHandler={this.purchaseHandler}
        >
          {orderSummary}
        </Modal>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdd: ingredientName =>
      dispatch(actionCreators.addIngredient(ingredientName)),
    onIngredientRemove: ingredientName =>
      dispatch(actionCreators.removeIngredient(ingredientName)),
    initIngredients: () => dispatch(actionCreators.initIngredients()),
    onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
    onSetAuthRedirectPath: path =>
      dispatch(actionCreators.setAuthRedirectPath(path))
  };
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

//handle the error hoc centrally
