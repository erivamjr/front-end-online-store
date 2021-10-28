import React, { Component } from 'react';
import { getProductsCart } from '../libs/localStorageCart';

class FinishBuy extends Component {
  constructor() {
    super();
    this.state = {
      cartProducts: [],
    };
    this.retrieveCartProducts = this.retrieveCartProducts.bind(this);
  }

  componentDidMount() {
    this.retrieveCartProducts();
  }

  retrieveCartProducts() {
    const cartProducts = getProductsCart();
    this.setState({ cartProducts });
  }

  render() {
    const { cartProducts } = this.state;
    return (
      <div>
        <div>
          <h3>Revise seus Produtos</h3>
          {cartProducts.map((product) => (
            <div key={ product.id }>
              <img src={ product.thumbnail } alt={ product.title } />
              <h3>{ product.quantity }</h3>
              <h3>{ product.title }</h3>
              <h3>{ product.price }</h3>
            </div>
          ))}
        </div>
        <form>
          <label htmlFor="name">
            <input name="name" id="name" type="text" data-testid="checkout-fullname" />
          </label>
          <label htmlFor="cpf">
            <input name="cpf" id="cpf" type="text" data-testid="checkout-cpf" />
          </label>
          <label htmlFor="email">
            <input name="email" id="email" type="email" data-testid="checkout-email" />
          </label>
          <label htmlFor="cellphone">
            <input name="cellphone" id="cellphone" type="text" data-testid="checkout-phone" />
          </label>
          <label htmlFor="cep">
            <input name="cep" id="cep" type="text" data-testid="checkout-cep" />
          </label>
          <label htmlFor="address">
            <input name="address" id="address" type="text" data-testid="checkout-address" />
          </label>
          <label htmlFor="complement">
            <input name="complement" id="complement" type="text" />
          </label>
          <label htmlFor="number">
            <input name="number" id="number" type="number" />
          </label>
          <label htmlFor="city">
            <input name="city" id="city" type="text" />
          </label>
          <label htmlFor="state">
            Estados:
            <select id="state" name="state">
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
              <option value="EX">Estrangeiro</option>
            </select>
          </label>
          <div>
            <h3>Boleto</h3>
            <label htmlFor="cardcredit">
              imagem
              <input type="radio" />
            </label>
          </div>
          <div>
            <h3>Cartão de Crédito</h3>
            <label htmlFor="cardcredit">
              <input type="radio" />
              Visa
            </label>
            <label htmlFor="cardcredit">
              <input type="radio" />
              Mastercard
            </label>
            <label htmlFor="cardcredit">
              <input type="radio" />
              Elo
            </label>
          </div>
          <button type="submit">Comprar</button>
        </form>
      </div>
    );
  }
}

export default FinishBuy;
