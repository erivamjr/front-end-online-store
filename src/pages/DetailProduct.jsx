import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addProduct } from '../libs/localStorageCart';

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
    this.fetchProductAndSave = this.fetchProductAndSave.bind(this);
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

  async fetchProductAndSave(product) {
    addProduct(product);
  }

  render() {
    const { title, price, thumbnail, attributes, id } = this.state;
    return (
      <div>
        <h2 data-testid="product-detail-name">{title}</h2>
        <p>{price}</p>
        <img src={ thumbnail } alt={ title } />
        {attributes.map(({ name, value_name: valueName, id: atributeID }) => (
          <div key={ atributeID }>
            <h3>{`${name}: ${valueName}`}</h3>
          </div>
        ))}
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this
            .fetchProductAndSave({ price, thumbnail, title, id }) }
        >
          Adicionar ao Carrinho
        </button>
        <Link
          data-testid="shopping-cart-button"
          to="/cart"
        >
          <button type="button">
            Carrinho de Compras
          </button>
        </Link>
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
