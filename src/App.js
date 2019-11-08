import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBilder";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <p>Test</p>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
