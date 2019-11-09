import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = { salad: 0.5, patty: 3, mushroom: 2, cheese: 1.4 };
class BurgerBilder extends Component {
  state = {
    ingredients: { salad: 0, patty: 0, mushroom: 0, cheese: 0 },
    totalPrice: 0
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
  };
  removeIngredientHandler = type => {
    const prevCount = this.state.ingredients[type];
    if (prevCount !== 0) {
      const newCount = prevCount - 1;
      const updatedIngredients = { ...this.state.ingredients };
      updatedIngredients[type] = newCount;

      //add the price of the added ingredient to the total-price
      const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: updatedTotalPrice
      });
    }
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
        />
      </Fragment>
    );
  }
}

export default BurgerBilder;
