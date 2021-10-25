export async function getCategories() {
  // Implemente aqui
  const fetchAPI = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await fetchAPI.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const fetchApi = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const products = await fetchApi.json();
  return products;
}
