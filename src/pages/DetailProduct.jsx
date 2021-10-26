import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DetailProduct extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      thumbnail: '',
      price: '',
      attributes: [],
    };

    this.fetchAndSaveProduct = this.fetchAndSaveProduct.bind(this);
    this.fetchProductById = this.fetchProductById.bind(this);
  }

  componentDidMount() {
    this.fetchAndSaveProduct();
  }

  async fetchProductById(id) {
    const fetchApi = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const product = await fetchApi.json();
    return product;
  }

  async fetchAndSaveProduct() {
    const {
      match: { params: { productId } },
    } = this.props;

    const product = await this.fetchProductById(productId);
    const { title, price, thumbnail, attributes } = product;

    this.setState({ title, price, thumbnail, attributes });
  }

  render() {
    const { title, price, thumbnail, attributes } = this.state;
    return (
      <div>
        <h2 data-testid="product-detail-name">{title}</h2>
        <p>{price}</p>
        <img src={ thumbnail } alt={ title } />
        {attributes.map(({ name, value_name: valueName, id }) => (
          <div key={ id }>
            <h3>{`${name}: ${valueName}`}</h3>
          </div>
        ))}
      </div>
    );
  }
}

DetailProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string,
      categoryId: PropTypes.string,
      productName: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailProduct;
