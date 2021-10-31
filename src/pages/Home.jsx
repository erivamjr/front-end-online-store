import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from '../components/ProductCard';
import LinkToCart from '../components/LinkToCart';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      searchTerm: '',
      searchedItems: [],
      categoryID: '',
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
    const { retrieveQuantity, productsQuantity } = this.props;
    return (
      <div>
        <div>
          <ul>
            {categories.map(({ id, name }) => (
              <li key={ id }>
                <button
                  data-testid="category"
                  type="button"
                  value={ id }
                  onClick={ this.onCategoryClick }
                >
                  { name }
                </button>
              </li>
            ))}
          </ul>
        </div>

        <section>
          <h2 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>

          <div>
            <label htmlFor="busca">
              <input
                name="busca"
                type="text"
                id="busca"
                placeholder="Buscar"
                onChange={ this.inputChangeHandler }
                data-testid="query-input"
              />
            </label>
            <button
              data-testid="query-button"
              type="button"
              onClick={ this.onSubmitHandler }
            >
              Buscar
            </button>
            <LinkToCart productsQuantity={ productsQuantity } />
          </div>

          <div>
            {
              (searchedItems.length > 0)
                ? searchedItems
                  .map((item) => (
                    <div key={ item.id }>
                      <ProductCard
                        product={ item }
                        retrieveQuantity={ retrieveQuantity }
                      />
                      {
                        (item.shipping.free_shipping)
                        && <p data-testid="free-shipping">Frete Grátis</p>
                      }
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
