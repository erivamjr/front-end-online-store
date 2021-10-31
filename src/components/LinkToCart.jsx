import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LinkToCart extends Component {
  render() {
    const { productsQuantity } = this.props;
    return (
      <Link data-testid="shopping-cart-button" to="/cart">
        <button
          type="button"
        >
          <i className="fas fa-shopping-cart" />
        </button>
        <span data-testid="shopping-cart-size">
          { productsQuantity }
        </span>
      </Link>
    );
  }
}

LinkToCart.propTypes = {
  productsQuantity: PropTypes.number.isRequired,
};

export default LinkToCart;
