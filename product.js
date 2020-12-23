// URL de l'api
const url = 'http://localhost:3000/api/cameras/';

// Recupere les paramètres de l'url
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const article = document.getElementById('oneCamera');

// Affiche le produit
const oneCamera = async () => {
  const data = await getOneCam(url, id);
  renderCam(data, article);
  addToCart(article, data);
};

// Récupère une caméra
const getOneCam = async (productUrl, productId) => {
  const response = await fetch(productUrl + productId);
  return await response.json();
};

// Personnalise le produit
const renderCam = (productData) => {
  const selector = document.createElement('select');
  productData.lenses.forEach((element) => {
    const option = document.createElement('option'); // Crée une balise option pour chaque lentille
    option.innerHTML = element;
    selector.appendChild(option);
  });

  article.innerHTML = `
    <div class="product-information">
        <img src="${productData.imageUrl}" alt="${productData.name}">
        <button class="product-link">
        <div class="product-info">
            <h2 class="product-name">${productData.name} </h2>
            <p class="product-price">${productData.price / 100}€</p> 
        </div>
        <div class="product-lenses">${selector.outerHTML}</div>
        
        <div class="info"> 
            <p class="description">${productData.description}</p> 
        </div>
        </button>
    </div>`;
};

// Ajoute le produit au panier
const addToCart = (parentElt, productData) => {
  // Crée le bouton d'envoie du produit
  const btn = document.createElement("button");
  const div = document.createElement("div");
  
  btn.textContent = "Add me to cart";
  div.classList.add("add-to-cart");
  parentElt.appendChild(div);
  parentElt.appendChild(btn);

  // Assigne valeur à envoyer à localStorage
  const product = [
    productData._id,
    productData.name,
    productData.price,
    productData.imageUrl,
  ];

  // Envoie valeur à localStorage après un clique
  btn.addEventListener("click", () => {
    localStorage.setItem(productData.name, JSON.stringify(product));
    btn.classList.add("invisible");
    div.textContent = "Add succefully";
  });
}

  oneCamera();

