// URL de l'api
const url = 'http://localhost:3000/api/cameras';


// Affiche tous les produits
const products = async () => {
  const products = await getAllCams(url);
  products.forEach((product) => {
    renderProducts(
      product.name,
      product._id,
      product.imageUrl,
      product.price,
      product.description,
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
) {
  const products = document.getElementById('cameras');
  const article = document.createElement('article'); // Récupère la div qui contiendra les différents articles
  article.classList.add('product-general')
  article.innerHTML = `
  <img alt="${productName}" src="${productImg}">
    <div class="product-list"><p class="product-name">${productName}</p> 
    <p class="product-price">${productPrice / 100}€</p>
    <a href="/HTML/product.html?id=${productId}" class="find-out-more">Développez-moi</a></div>
    `;

  products.append(article);
}
products();


