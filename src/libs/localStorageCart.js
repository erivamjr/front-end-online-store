const PRODUCTS_CART_KEY = 'product_cart';

if (!JSON.parse(localStorage.getItem(PRODUCTS_CART_KEY))) {
  localStorage.setItem(PRODUCTS_CART_KEY, JSON.stringify([]));
}

const readProductsCart = () => JSON.parse(localStorage.getItem(PRODUCTS_CART_KEY));

const saveProductsCart = (productsCart) => localStorage
  .setItem(PRODUCTS_CART_KEY, JSON.stringify(productsCart));

export const getProductsCart = () => {
  const productsCart = readProductsCart();
  return productsCart;
};

export const addProduct = (product) => {
  if (product) {
    const productsCart = readProductsCart();
    saveProductsCart([...productsCart, product]);
  }
};
