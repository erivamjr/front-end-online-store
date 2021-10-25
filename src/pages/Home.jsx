import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
    this.fetchCategories = this.fetchCategories.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
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
          <Link data-testid="shopping-cart-button" to="/cart">
            <button type="button">
              Carrinho de Compras
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
