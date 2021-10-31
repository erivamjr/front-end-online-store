import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            ? products.map(({
              freeShipping,
              id,
              price,
              quantity,
              thumbnail,
              title,
              available_quantity: avaiableQuantity,
              maxQuantity,
            }) => (
              <div
                key={ `cart${id}` }
              >
                <Link
                  to={ `product/${id}` }
                  data-testid="product-detail-link"
                >
                  <div data-testid="product">

                    {
                      (freeShipping)
                            && <p data-testid="free-shipping">Frete Grátis</p>
                    }

                    {/* <img
                            src={ getHdImage(thumbnail) }
                            alt={ title }
                          /> */}

                    <img
                      src={ thumbnail }
                      alt={ title }
                      className="img-for-test"
                    />
                    <div>
                      <span>
                        {`Unidades disponíveis: ${avaiableQuantity}`}
                      </span>
                    </div>

                    <div>
                      <span>R$ </span>
                      <span>{ price }</span>
                    </div>

                    <h4 data-testid="shopping-cart-product-name">
                      { title }
                    </h4>
                  </div>
                </Link>

                <div className="product-quantity">
                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ () => {
                      changeQuantity(id, DEACREASE);
                      this.retrieveProducts();
                    } }
                  >
                    -
                  </button>
                  <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
                  {
                    (quantity <= maxQuantity)
                      ? (
                        <button
                          type="button"
                          data-testid="product-increase-quantity"
                          onClick={ () => {
                            changeQuantity(id, INCREASE);
                            this.retrieveProducts();
                          } }
                        >
                          +
                        </button>
                      )
                      : (
                        <button
                          type="button"
                          data-testid="product-increase-quantity"
                          onClick={ () => {
                            changeQuantity(id, INCREASE);
                            this.retrieveProducts();
                          } }
                          disabled
                        >
                          +
                        </button>
                      )
                  }

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
