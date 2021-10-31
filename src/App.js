import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getProductsQuantity } from './libs/localStorageCart';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';
import DetailProduct from './pages/DetailProduct';
import FinishBuy from './pages/FinishBuy';

class App extends Component {
  constructor() {
    super();
    this.state = {
      productsQuantity: 0,
    };

    this.retrieveQuantity = this.retrieveQuantity.bind(this);
  }

  componentDidMount() {
    this.retrieveQuantity();
  }

  retrieveQuantity() {
    const productsQuantity = getProductsQuantity();
    this.setState({ productsQuantity });
  }

  render() {
    const { productsQuantity } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (
              <Home
                retrieveQuantity={ this.retrieveQuantity }
                productsQuantity={ productsQuantity }
              />
            ) }
          />
          <Route path="/cart" component={ Cart } />
          <Route
            exact
            path="/product/:productId"
            render={ (props) => (
              <DetailProduct
                { ...props }
                retrieveQuantity={ this.retrieveQuantity }
                productsQuantity={ productsQuantity }
              />
            ) }
          />
          <Route
            exact
            path="/finishbuy"
            render={ () => (
              <FinishBuy
                retrieveQuantity={ this.retrieveQuantity }
                productsQuantity={ productsQuantity }
              />
            ) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
