import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

//global variable
const INGREDIENT_PRICES = {
  salad: 0.5,
  patty: 3,
  mushroom: 2,
  cheese: 1.4,
  pickle: 0.5,
  jalapeno: 0.2
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 2,
    canBeOrdered: false,
    isModalOpen: false,
    isLoading: false,
    error: false
  };
  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(response => {
        const ingredients = response.data;
        this.setState({ ingredients });
      })
      .catch(err => this.setState({ error: true }));
  }
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
  purchaseHandler = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };
  proceedToCheckout = () => {
    this.setState({ isLoading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Johannes",
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
        this.setState({ isLoading: false, isModalOpen: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render() {
    //if the amount of the ingredient equals 0 disable the button
    const disabledButtonInfo = { ...this.state.ingredients };
    for (let key in disabledButtonInfo) {
      disabledButtonInfo[key] = disabledButtonInfo[key] <= 0;
    }

    let burger = <Spinner />;
    let orderSummary = null;

    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disabledButtonInfo={disabledButtonInfo}
            totalPrice={this.state.totalPrice}
            canBeOrdered={this.state.canBeOrdered}
            modalHandler={this.purchaseHandler}
          />
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
          purchaseHandler={this.purchaseHandler}
          proceedToCheckout={this.proceedToCheckout}
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
