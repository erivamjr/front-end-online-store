import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';
import { getProductsCart } from '../libs/localStorageCart';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
    this.teste = this.teste.bind(this);
  }

  componentDidMount() {
    this.teste();
  }

  teste() {
    const products = getProductsCart();
    this.setState({
      products,
    });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        {
          products.length
            ? products.map((product) => (
              <div
                key={ product.id }
              >
                <ProductCard
                  product={ product }
                />
                <p data-testid="shopping-cart-product-quantity">0</p>
              </div>
            ))
            : (
              <span
                data-testid="shopping-cart-empty-message"
              >
                Seu carrinho está vazio
              </span>
            )
        }
      </div>
    );
  }
}

export default Cart;
