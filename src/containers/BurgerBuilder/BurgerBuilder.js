import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

//global variable
const INGREDIENT_PRICES = { salad: 0.5, patty: 3, mushroom: 2, cheese: 1.4 };

class BurgerBuilder extends Component {
  state = {
    ingredients: { salad: 0, patty: 0, mushroom: 0, cheese: 0 },
    totalPrice: 2,
    canBeOrdered: false,
    isModalOpen: false
  };
  addIngredientHandler = type => {
    const prevCount = this.state.ingredients[type];
    const newCount = prevCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;

    //add the price of the added ingredient to the total-price
    const updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice
    });

    //in order to get the updated ingredients correct amount, we should pass it as a parameter to the
    //updateOrderStateFunction
    this.updateOrderState(updatedIngredients);
  };
  removeIngredientHandler = type => {
    const prevCount = this.state.ingredients[type];
    if (prevCount === 0) {
      return;
    }
    const newCount = prevCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;

    //add the price of the added ingredient to the total-price
    const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice
    });

    //in order to get the updated ingredients correct amount, we should pass it as a parameter to the
    //updateOrderStateFunction
    this.updateOrderState(updatedIngredients);
  };

  //disable/enable the ORDER button
  updateOrderState = ingredients => {
    const sum = Object.values(ingredients).reduce((acc, el) => {
      return acc + el;
    }, 0);

    this.setState({ canBeOrdered: sum > 0 });
  };
  modalHandler = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };
  render() {
    //if the amount of the ingredient equals 0 disable the button
    const disabledButtonInfo = { ...this.state.ingredients };
    for (let key in disabledButtonInfo) {
      disabledButtonInfo[key] = disabledButtonInfo[key] <= 0;
    }
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabledButtonInfo={disabledButtonInfo}
          totalPrice={this.state.totalPrice}
          canBeOrdered={this.state.canBeOrdered}
          modalHandler={this.modalHandler}
        />
        <Modal show={this.state.isModalOpen} modalHandler={this.modalHandler}>
          <OrderSummary ingredients={this.state.ingredients}></OrderSummary>
        </Modal>
      </Fragment>
    );
  }
}

export default BurgerBuilder;
