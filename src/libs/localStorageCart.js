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

export const changeQuantity = (product, counter) => {
  const productsCart = readProductsCart();
  const savedProduct = productsCart
    .find((actualProduct) => actualProduct.id === product.id);
  if (savedProduct.quantity >= 1) {
    savedProduct.quantity += counter;
    saveProductsCart([...productsCart]);
  }
};

export const getQuantity = () => {
  const productsCart = readProductsCart();
  const productsQuantity = productsCart.reduce((acc, cur) => {
    console.log(acc, cur.quantity);
    return acc + cur.quantity;
  }, 0);
  return productsQuantity;
};
