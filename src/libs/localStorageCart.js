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
    if (!productsCart.some((actualProduct) => actualProduct.id === product.id
      && product.availableQuantity >= 1)) {
      product.quantity = 1;
      product.maxQuantity = product.availableQuantity;
      saveProductsCart([...productsCart, product]);
    } else if (product.availableQuantity >= 1) {
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
  if (savedProduct.quantity >= 1
      && savedProduct.availableQuantity >= 1
      && savedProduct.quantity <= savedProduct.availableQuantity) {
    if (counter === +1) {
      savedProduct.availableQuantity -= 1;
      savedProduct.quantity += counter;
      saveProductsCart([...productsCart]);
    } else {
      savedProduct.availableQuantity += 1;
      savedProduct.quantity += counter;
      saveProductsCart([...productsCart]);
    }
  }
  // else {
  //   savedProduct.quantity = 1;
  //   saveProductsCart([...productsCart]);
  // }
};

export const getProductsQuantity = () => {
  const productsCart = readProductsCart();
  const productsQuantity = productsCart.reduce((acc, cur) => acc + cur.quantity, 0);
  return productsQuantity;
};
