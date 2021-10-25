import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <Link data-testid="shopping-cart-button" to="/cart">
          <button type="button">
            Carrinho de Compras
          </button>
        </Link>
      </div>
    );
  }
}

export default Home;
