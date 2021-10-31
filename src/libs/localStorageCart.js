const PRODUCTS_CART_KEY = 'product_cart';

if (!JSON.parse(localStorage.getItem(PRODUCTS_CART_KEY))) {
  localStorage.setItem(PRODUCTS_CART_KEY, JSON.stringify([]));
}

const readProductsCart = () => JSON.parse(localStorage.getItem(PRODUCTS_CART_KEY)) || [];

const saveProductsCart = (productsCart) => localStorage
  .setItem(PRODUCTS_CART_KEY, JSON.stringify(productsCart));

export const getProductsCart = () => {
  const productsCart = readProductsCart();
  return productsCart;
};

export const addProduct = (product) => {
  if (product) {
    const productsCart = readProductsCart();
    if (!productsCart.some((actualProduct) => actualProduct.id === product.id)) {
      product.quantity = 1;
      saveProductsCart([...productsCart, product]);
    } else {
      const savedProduct = productsCart
        .find((actualProduct) => actualProduct.id === product.id);
      savedProduct.quantity += 1;
      saveProductsCart([...productsCart]);
    }
  }
};

export const changeQuantity = (productId, counter) => {
  const productsCart = readProductsCart();
  const savedProduct = productsCart
    .find((actualProduct) => actualProduct.id === productId);
  if (savedProduct.quantity >= 1) {
    savedProduct.quantity += counter;
    saveProductsCart([...productsCart]);
  }
};

export const getProductsQuantity = () => {
  const productsCart = readProductsCart();
  const productsQuantity = productsCart.reduce((acc, cur) => acc + cur.quantity, 0);
  return productsQuantity;
};
