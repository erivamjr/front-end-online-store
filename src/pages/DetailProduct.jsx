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
      id: '',
      freeShipping: false,
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
    const {
      title,
      price,
      thumbnail,
      attributes,
      id,
      shipping: { free_shipping: freeShipping },
    } = product;

    this.setState({ title, price, thumbnail, attributes, id, freeShipping });
  }

  async fetchProductAndSave(product) {
    addProduct(product);
  }

  render() {
    const { title, price, thumbnail, attributes, id, freeShipping } = this.state;
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
        {
          (freeShipping)
          && <p data-testid="free-shipping">Frete Grátis</p>
        }
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
        <form onSubmit={ this.function } className="form-avaliation">
          <label htmlFor="email">
            <input type="email" id="email" />
          </label>
          <span className="star-cb-group">
            <label htmlFor="rating-0">
              0
              <input
                type="radio"
                id="rating-0"
                name="rating"
                value="0"
              />
            </label>
            <label htmlFor="rating-1">
              1
              <input
                type="radio"
                id="rating-1"
                name="rating"
                value="1"
              />
            </label>
            <label htmlFor="rating-2">
              2
              <input
                type="radio"
                id="rating-2"
                name="rating"
                value="2"
              />
            </label>
            <label htmlFor="rating-3">
              3
              <input
                type="radio"
                id="rating-3"
                name="rating"
                value="3"
              />
            </label>
            <label htmlFor="rating-4">
              4
              <input
                type="radio"
                id="rating-4"
                name="rating"
                value="4"
              />
            </label>
            <label htmlFor="rating-5">
              5
              <input
                type="radio"
                id="rating-5"
                name="rating"
                value="5"
                className="star-cb-clear"
              />
            </label>
          </span>
          <label htmlFor="product-detail-evaluation">
            <textarea
              className="form-textarea"
              type="textarea"
              data-testid="product-detail-evaluation"
            />
          </label>
          <button type="submit" className="submit-button">Avaliar</button>
        </form>
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
