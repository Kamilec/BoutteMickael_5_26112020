// URL de l'api
const url = 'http://localhost:3000/api/cameras';

// Affiche tous les produits
const Products = async () => {
  const products = await getAllCams(url);
  products.forEach((product) => {
    renderProducts(
      product.name,
      product._id,
      product.imageUrl,
      product.price,
      product.description
    );
  });
};

// Récupère toutes les caméras
const getAllCams = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

// Fourni l'affichage d'un produit
function renderProducts(
  productName,
  productId,
  productImg,
  productPrice,
  productDescription
) {
  const products = document.getElementById('cameras');
  const article = document.createElement('article'); // Récupère la div qui contiendra les différents articles
  article.innerHTML = `<a href="product.html?id=${productId}">
  <img alt="${productName}" src="${productImg}"></a>
    <button class="product-link" type="button"><a href="product.html?id=${productId}">${productName} - ${
    productPrice / 100
  }€<p class="info">${productDescription}</p></button></a>
    `;

  products.append(article);
}

Products();
