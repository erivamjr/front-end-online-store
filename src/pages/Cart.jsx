import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProductsCart, changeQuantity } from '../libs/localStorageCart';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
    this.retrieveProducts = this.retrieveProducts.bind(this);
  }

  componentDidMount() {
    this.retrieveProducts();
  }

  retrieveProducts() {
    const products = getProductsCart();
    this.setState({
      products,
    });
  }

  render() {
    const { products } = this.state;
    const DEACREASE = -1;
    const INCREASE = +1;
    return (
      <div>
        {
          products.length
            ? products.map((product) => (
              <div
                key={ `cart${product.id}` }
              >
                <ProductCard
                  product={ product }
                />
                <div className="product-quantity">
                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ () => {
                      changeQuantity(product, DEACREASE);
                      this.retrieveProducts();
                    } }
                  >
                    -
                  </button>
                  <p data-testid="shopping-cart-product-quantity">{product.quantity}</p>
                  <button
                    type="button"
                    data-testid="product-increase-quantity"
                    onClick={ () => {
                      changeQuantity(product, INCREASE);
                      this.retrieveProducts();
                    } }
                  >
                    +
                  </button>
                </div>
                <button type="button">Excluir</button>
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
        <Link to="/finishbuy">
          <button type="button" data-testid="checkout-products">Checkout</button>
        </Link>
      </div>
    );
  }
}

export default Cart;
