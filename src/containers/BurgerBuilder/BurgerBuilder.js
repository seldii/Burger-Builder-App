import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurgerBuilder extends Component {
  state = {
    isModalOpen: false,
    isLoading: false,
    error: false
  };
  componentDidMount() {
    /* axios
      .get("/ingredients.json")
      .then(response => {
        const ingredients = response.data;
        this.setState({ ingredients });
      })
      .catch(err => this.setState({ error: true })); */
  }

  //disable/enable the ORDER button in BurgerControls Component
  updateOrderState = ingredients => {
    const sum = Object.values(ingredients).reduce((acc, el) => {
      return acc + el;
    }, 0);

    return sum > 0;
  };
  purchaseHandler = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };
  proceedToCheckout = () => {
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
    if (this.state.error) {
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
    onIngredientAdd: ingredientName => {
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        payload: { ingredientName }
      });
    },
    onIngredientRemove: ingredientName => {
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        payload: { ingredientName }
      });
    }
  };
};

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
