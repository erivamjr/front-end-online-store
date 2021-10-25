import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      searchTerm: '',
      searchedItems: [],
    };
    this.fetchCategories = this.fetchCategories.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async onSubmitHandler() {
    const { searchTerm } = this.state;
    const searchedItems = await getProductsFromCategoryAndQuery('', searchTerm);
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
    return (
      <div>
        <div>
          <ul>
            {categories.map(({ id, name }) => (
              <li key={ id } data-testid="category">
                { name }
              </li>
            ))}
          </ul>
        </div>
        <div>
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
            <button data-testid="query-button" type="button" onClick={ this.onSubmitHandler }>
              Buscar
            </button>
            <Link data-testid="shopping-cart-button" to="/cart">
              <button type="button">
                Carrinho de Compras
              </button>
            </Link>
          </div>
          <div>
            {
              (searchedItems.length > 0)
                ? searchedItems.map(({ price, thumbnail, title, id }) => (
                  <div data-testid="product" key={ id }>
                    <h3>{ title }</h3>
                    <img src={ thumbnail } alt={ title } />
                    <p>{ price }</p>
                  </div>
                )) : <p>Nenhum produto foi encontrado</p>
            }
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
