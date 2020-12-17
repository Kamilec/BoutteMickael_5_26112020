// URL de l'api
const url = 'http://localhost:3000/api/cameras';

// Recupere les paramètres de l'url
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const article = document.getElementById('oneCamera');

// Affiche le produit
const oneCamera = async () => {
  const data = await getOneCams(url, id);
  renderCams(data);
  customizeYourCamera(onlyCamera, data.lenses);
  addToCart(onlyCamera, data);
};

// Récupère une caméra
function getOneCams(productUrl, productId) {
  const response = await fetch(productUrl + productId);
  return await response.json();
}

// Fourni l'affichage selon les données du produit
const renderCams = (onlyOne) => {
  oneCamera.innerHTML = `
    <div class="product">
        <img src="${onlyOne.imageUrl}" alt="${onlyOne.name}">
        <div class="product-information">
            <h2 class="product-title">${onlyOne.name}</h2>
            <p class="product-price">${onlyOne.price / 1000}€</p>       
            <p class="description">Le vintage à l'état pure avec ces caméras !</p>
        </div>
    </div>`;
};



oneCamera();
