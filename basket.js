const cart = document.querySelector('#basket'); // Récupère la section du panier
const cartTotal = document.getElementById('basket-total'); //Récupère le h3 pour le prix total
const form = document.querySelector('form'); // Récupère le formulaire
const parentsection = document.getElementById('basket');
let arrayProducts = [];

for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  let product = JSON.parse(localStorage.getItem(key));
  let article = document.createElement('article');
  arrayProducts[i] = product.id;

  article.innerHTML = `
    <div class="product-information product-row">
            <img src="${product.imageUrl}">
            <h3 class="product-name" >${product.name} (${product.price / 100}€) </h3>
            <input id="${product.price}" type="number" class="quantity" name="quatity" value=${product.qte}>
            <p id="${product.price + product.name}" class="price-total">${(product.price / 100) * product.qte}</p>
       <button id="${product.name}">Supprimer</button>
    </div>`;

  parentsection.appendChild(article);

  let input = document.getElementById(product.price);

  input.addEventListener('change', (e) => {
    product.qte = e.target.value;
    localStorage.setItem(product.name, JSON.stringify(product));
    let price = document.getElementById(product.price + product.name);
    price.innerHTML = (product.price / 100) * product.qte;
    totalPrice();
  });

  let btn = document.getElementById(product.name);
  btn.addEventListener('click', (e) => {
    product.qte = e.target.value;
    localStorage.removeItem(product.name);
    window.location.reload();
  });
}

let totalPrice = () => {
  let allPrice = document.getElementsByClassName('price-total');
  let price = 0;
  for (let element of allPrice) {
    price += parseInt(element.innerHTML);
  }
  document.getElementById('total-price').innerHTML = price + '€';
};
totalPrice();

let btnConfirm = document.getElementById('btn');
let firstName = document.getElementById('firstName');
let missFirstName = document.getElementById('missFirstName'); 
let lastName = document.getElementById('lastName');
let missLastName = document.getElementById('missLastName');
let address = document.getElementById('address');
let missAddress = document.getElementById('missAddress');
let city = document.getElementById('city');
let missCity = document.getElementById('missCity');
let email = document.getElementById('email');
let missEmail = document.getElementById('missEmail');
let firstNameV = /^[a-zA-ZéèîïÀÈÉÇÙÏÎ][a-zéèêëàçîï]+([-'\s][a-zA-ZéèîïÀÈÉÇÙÏÎ][a-zéèêëàçîï]+)?/;
let LastNameV = /^[a-zA-ZéèîïÀÈÉÇÙÏÎ][a-zéèêëàçîï]+([-'\s][a-zA-ZéèîïÀÈÉÇÙÏÎ][a-zéèêëàçîï]+)?/;
let addressV = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
let cityV = /^[a-zA-ZéèîïÀÈÉÇÙÏÎ][a-zéèêëàçîï]+([-'\s][a-zA-ZéèîïÀÈÉÇÙÏÎ][a-zéèêëàçîï]+)?/;
let emailV = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
btnConfirm.addEventListener('click', f_valide, formValidation);

function f_valide(e) {
  if (firstName.validity.valueMissing) {
    e.preventDefault();
    missFirstName.textContent = 'Veuillez renseigner votre nom';
    missFirstName.style.color = 'red';
  } else if (firstNameV.test(firstName.value) == false) {
    e.preventDefault();
    missFirstName.textContent = 'Format incorrect';
    missFirstName.style.color = 'orange';
    missFirstName.style.fontWeight = 'bold';
  } else {
  }
   if (lastName.validity.valueMissing) {
     e.preventDefault();
     missLastName.textContent = 'Veuillez renseigner votre prénom';
     missLastName.style.color = 'red';
   } else if (LastNameV.test(lastName.value) == false) {
     e.preventDefault();
     missLastName.textContent = 'Format incorrect';
     missLastName.style.color = 'orange';
     missLastName.style.fontWeight = 'bold';
   } else {
  }
   if (address.validity.valueMissing) {
     e.preventDefault();
     missAddress.textContent = 'Veuillez renseigner votre adresse';
     missAddress.style.color = 'red';
   } else if (addressV.test(address.value) == false) {
     e.preventDefault();
     missAddress.textContent = 'Format incorrect';
     missAddress.style.color = 'orange';
     missAddress.style.fontWeight = 'bold';
   } else {
   }
   if (city.validity.valueMissing) {
     e.preventDefault();
     missCity.textContent = 'Veuillez renseigner votre ville';
     missCity.style.color = 'red';
   } else if (cityV.test(city.value) == false) {
     e.preventDefault();
     missCity.textContent = 'Format incorrect';
     missCity.style.color = 'orange';
     missCity.style.fontWeight = 'bold';
   } else {
  }
    if (email.validity.valueMissing) {
      e.preventDefault();
      missEmail.textContent = 'Veuillez renseigner votre email';
      missEmail.style.color = 'red';
    } else if (emailV.test(email.value) == false) {
      e.preventDefault();
      missEmail.textContent = 'Format incorrect';
      missEmail.style.color = 'orange';
      missEmail.style.fontWeight = 'bold';
    } else {
  }
};

function formValidation() {
  let order = {
    contact: {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value,
    },
    products: arrayProducts,
  };
  let headers = {
    'Content-Type': 'application/json',
  };
  console.log(JSON.stringify(order));
  fetch('http://localhost:3000/api/cameras/order', {
    method: 'POST',
    body: JSON.stringify(order),
    headers: headers,
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        console.log('Erreur');
        return response.status;
      }
    })
    .then(function (data) {
      console.log(data.orderId); 
    });
}






