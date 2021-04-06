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
  addToBasket(article, data);
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
    // Crée une balise option pour chaque lentille
    const option = document.createElement('option');
    option.textContent = ' Choice a lenses';
    option.innerHTML = element;
    selector.appendChild(option);
  });

  article.innerHTML = `
    <div class="product-information">
        <img src="${productData.imageUrl}" alt="${productData.name}">
        <div class="product-info">
            <h2 class="name-price">${productData.name} - ${productData.price / 100}€</h2>
        </div>
        <div class="product-lenses">${selector.outerHTML}</div>
        <div class="info"> 
            <p class="description">${productData.description}</p> 
        </div>
    </div>`;
};


// Ajoute le produit au panier
const addToBasket = (basket, productData) => {
  // Crée le bouton d'envoie du produit
  const btn = document.createElement('button');
  const div = document.createElement('div');
  btn.textContent = 'Ajouter au panier';
  div.classList.add('add-to-basket');
  btn.classList.add('add');
  basket.appendChild(div);
  basket.appendChild(btn);

  // Assigne valeur à envoyer à localStorage
  const product = {
    id: productData._id,
    name: productData.name,
    price: productData.price,
    imageUrl: productData.imageUrl,
    qte: 1,
  };
  
  // Envoie valeur à localStorage après un clique
  btn.addEventListener('click', () => {
    let verifItem = localStorage.getItem(productData.name);
    if (verifItem != null) {
      verifItem = JSON.parse(verifItem);
      verifItem.qte++;
      localStorage.setItem(productData.name, JSON.stringify(verifItem));
    } else {
      localStorage.setItem(productData.name, JSON.stringify(product));
    }
    upDateQte();
  });
};
oneCamera();
