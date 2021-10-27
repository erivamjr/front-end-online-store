import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addProduct } from '../libs/localStorageCart';

class ProductCard extends Component {
  constructor() {
    super();
    this.fetchProductAndSave = this.fetchProductAndSave.bind(this);
  }

  async fetchProductAndSave({ target }) {
    const { value } = target;
    const fetchApi = await fetch(`https://api.mercadolibre.com/items/${value}`);
    const product = await fetchApi.json();
    addProduct(product);
  }

  render() {
    const { product: { price, thumbnail, title, id } } = this.props;
    return (
      <div>
        <Link
          key={ id }
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
          onClick={ this.fetchProductAndSave }
          value={ id }
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
};

export default ProductCard;
