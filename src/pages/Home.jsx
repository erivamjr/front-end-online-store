import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { addProduct } from '../libs/localStorageCart';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import LinkToCart from '../components/LinkToCart';
// import getHdImage from '../libs/hdImage';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      categoryID: '',
      searchTerm: '',
      searchedItems: [],
    };
    this.fetchCategories = this.fetchCategories.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.onCategoryClick = this.onCategoryClick.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  onCategoryClick({ target }) {
    const { value } = target;
    this.setState({ categoryID: value }, this.onSubmitHandler);
  }

  async onSubmitHandler() {
    const { searchTerm, categoryID } = this.state;
    const searchedItems = await getProductsFromCategoryAndQuery(categoryID, searchTerm);
    const { results } = searchedItems;
    this.setState({
      searchedItems: [...results],
    });
  }

  async fetchCategories() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  inputChangeHandler({ target }) {
    const { value } = target;
    this.setState({
      searchTerm: value,
    });
  }

  render() {
    const { categories, searchedItems } = this.state;
    const { productsQuantity, retrieveQuantity } = this.props;
    return (
      <div className="main-container">
        <div className="categories-list">
          {categories.map(({ id, name }) => (
            <button
              key={ id }
              data-testid="category"
              type="button"
              value={ id }
              onClick={ this.onCategoryClick }
            >
              { name }
            </button>
          ))}
        </div>

        <section className="search-container">
          <h2 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>

          <div className="search-and-cart">
            <div className="search-bar">
              <input
                data-testid="query-input"
                type="text"
                placeholder="Busque aqui seu produto"
                onChange={ this.inputChangeHandler }
              />

              <button
                data-testid="query-button"
                type="button"
                onClick={ this.onSubmitHandler }
              >
                Buscar
              </button>
            </div>

            <LinkToCart productsQuantity={ productsQuantity } />
          </div>

          <div className="products-container">
            {
              (searchedItems.length > 0)
                ? searchedItems
                  .map((
                    {
                      id,
                      price,
                      thumbnail,
                      title, shipping: { free_shipping: freeShipping }
                    }) => (
                    <div
                      key={ `home-${id}` }
                      className="product-card"
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
                            <span>R$ </span>
                            <span>{ price }</span>
                          </div>

                          <h4 data-testid="shopping-cart-product-name">
                            { title }
                          </h4>
                        </div>
                      </Link>

                      <button
                        data-testid="product-add-to-cart"
                        type="button"
                        onClick={ () => {
                          addProduct({ freeShipping, id, price, thumbnail, title });
                          retrieveQuantity();
                        } }
                      >
                        Add Cart
                      </button>
                    </div>
                  )) : <p>Nenhum produto foi encontrado</p>
            }
          </div>
        </section>
      </div>
    );
  }
}

Home.propTypes = {
  productsQuantity: PropTypes.number.isRequired,
  retrieveQuantity: PropTypes.func.isRequired,
};

export default Home;
