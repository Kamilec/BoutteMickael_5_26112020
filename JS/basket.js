const cartTotal = document.getElementById('total-price'); //Récupère le h3 pour le prix total
const form = document.querySelector('form'); // Récupère le formulaire
const parentsection = document.getElementById('basket');
let arrayProducts = [];
let finalPrice = 0;

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key === 'orderId' || key === '') {
    continue;
  }
  let product = JSON.parse(localStorage.getItem(key));
  let article = document.createElement('article');
  arrayProducts.push(product.id);

  article.innerHTML = `
    <div class="product-information product-row">
            <img src="${product.imageUrl}">
            <h3 class="product-name" >${product.name} (${
    product.price / 100
  }€) </h3>
            <input id="${
              product.price
            }" type="number" class="quantity" name="quatity" value=${
    product.qte
  }>
            <p id="${product.price + product.name}" class="price-total">${
    (product.price / 100) * product.qte
  }</p>
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

function totalPrice() {
  let allPrice = document.getElementsByClassName('price-total');
  for (let element of allPrice) {
    finalPrice += parseInt(element.innerHTML);
  }
  document.getElementById('total-price').innerHTML = finalPrice + '€';
}
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

btnConfirm.addEventListener('click', function (e) {
  e.stopPropagation();
  e.preventDefault();
  const status = f_valide();
  if (!status) {
    console.log('erreur dans le formulaire');
    return;
  }
  sendOrder();
});

function validateInput(input, inputV, errorTag, message) {
  error = false;
  if (input.validity.valueMissing) {
    errorTag.textContent = message;
    errorTag.style.color = '#f0a30a';
    errorTag.style.fontWeight = 'bolder';
    error = true;
  } else if (inputV.test(input.value) == false) {
    errorTag.textContent = 'Format incorrect';
    errorTag.style.color = 'red';
    errorTag.style.fontWeight = 'bolder';
    error = true;
  }
  return error;
}

function f_valide() {
  let v_firstName = validateInput(firstName,firstNameV,missFirstName,'Veuillez renseigner votre prénom');
  let v_lastName = validateInput(lastName,LastNameV,missLastName,'Veuillez renseigner votre nom');
  let v_adresse = validateInput(address,addressV,missAddress,'Veuillez renseigner votre adresse');
  let v_city = validateInput(city,cityV,missCity,'Veuillez renseigner votre ville');
  let v_email = validateInput(email,emailV,missEmail,'Votre email n\'est pas valide');

  if (!v_firstName && !v_lastName && !v_email && !v_city && !v_adresse) {
    return true;
  } else {
    return false;
  }
}

function sendOrder() {
  let order = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
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
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key === 'orderId' || key === 'cartTotal') {
          continue;
        }
      }
      let firstNameValue = firstName.value;
      let lastNameValue = lastName.value;
      let emailValue = email.value;

      localStorage.setItem('finalPrice', finalPrice + '€');
      localStorage.setItem('orderId', data.orderId);
      localStorage.setItem('firstName', firstNameValue);
      localStorage.setItem('lastName', lastNameValue);
      localStorage.setItem('email', emailValue);

      document.location.href = '/HTML/confirmation.html';
    });
}
