// URL de l'api
const url = 'http://localhost:3000/api/cameras/';
// Recupere les paramètres de l'url
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const article = document.getElementById('oneCamera');

// Affiche le produit
const oneCamera = async () => {
  const data = await getOneCams(url, id);
  renderCams(data, article);
  addToCart(article, data);
};

// Récupère une caméra
const getOneCams = async (productUrl, productId) => {
  const response = await fetch(productUrl + productId);
  return await response.json();
};

// Affichage selon les données du produit
const renderCams = (productData) => {
  article.innerHTML = `
    <div class="product-information">
        <img src="${productData.imageUrl}" alt="${productData.name}">
        <button class="product-link">
        <div class="product-info">
            <h2 class="product-name">${productData.name} </h2>
            <p class="product-price">${productData.price / 100}€</p> 
        </div>
        <div class="product-lenses">
        <select><option>${productData.lenses}</option></select>
        </div>
            <div class="info">
            <p class="description">${productData.description}</p>
            </div>
        </button>
    </div>`;
};

oneCamera();
