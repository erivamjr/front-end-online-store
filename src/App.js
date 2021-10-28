import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';
import DetailProduct from './pages/DetailProduct';
import FinishBuy from './pages/FinishBuy';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/cart" component={ Cart } />
          <Route
            path="/product/:productId"
            component={ DetailProduct }
          />
          <Route path="/finishbuy" component={ FinishBuy } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
