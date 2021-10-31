import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addProduct } from '../libs/localStorageCart';

class ProductCard extends Component {
  constructor() {
    super();
    this.fetchProductAndSave = this.fetchProductAndSave.bind(this);
  }

  async fetchProductAndSave(product) {
    addProduct(product);
  }

  render() {
    const { product: { price, thumbnail, title, id }, retrieveQuantity } = this.props;
    return (
      <div>
        <Link
          to={ `product/${id}` }
          data-testid="product-detail-link"
        >
          <div data-testid="product">
            <h3 data-testid="shopping-cart-product-name">{ title }</h3>
            <img src={ thumbnail } alt={ title } />
            <p>{ price }</p>
          </div>
        </Link>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ () => {
            this
              .fetchProductAndSave({ price, thumbnail, title, id });
            retrieveQuantity();
          } }
        >
          Add Cart
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  retrieveQuantity: PropTypes.func.isRequired,
};

export default ProductCard;
