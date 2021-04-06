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

function f_valide() {
  let error = false;
  if (firstName.validity.valueMissing) {
    missFirstName.textContent = 'Veuillez renseigner votre prénom';
    missFirstName.style.color = '#f0a30a';
    missFirstName.style.fontWeight = 'bolder';
    error = true;
  } else if (firstNameV.test(firstName.value) == false) {
    missFirstName.textContent = 'Format incorrect';
    missFirstName.style.color = 'red';
    missFirstName.style.fontWeight = 'bolder';
    error = true;
  }
  if (lastName.validity.valueMissing) {
    missLastName.textContent = 'Veuillez renseigner votre nom';
    missLastName.style.color = '#f0a30a';
    missLastName.style.fontWeight = 'bolder';
    error = true;
  } else if (LastNameV.test(lastName.value) == false) {
    missLastName.textContent = 'Format incorrect';
    missLastName.style.color = 'red';
    missLastName.style.fontWeight = 'bolder';
    error = true;
  }
  if (address.validity.valueMissing) {
    missAddress.textContent = 'Veuillez renseigner votre adresse';
    missAddress.style.color = '#f0a30a';
    missAddress.style.fontWeight = 'bolder';
    error = true;
  } else if (addressV.test(address.value) == false) {
    missAddress.textContent = 'Format incorrect';
    missAddress.style.color = '#f0a30a';
    missAddress.style.fontWeight = 'bolder';
    error = true;
  }
  if (city.validity.valueMissing) {
    missCity.textContent = 'Veuillez renseigner votre ville';
    missCity.style.color = '#f0a30a';
    missCity.style.fontWeight = 'bolder';
    error = true;
  } else if (cityV.test(city.value) == false) {
    missCity.textContent = 'Format incorrect';
    missCity.style.color = 'red';
    missCity.style.fontWeight = 'bolder';
    error = true;
  }
  if (email.validity.valueMissing) {
    missEmail.textContent = 'Veuillez renseigner votre email';
    missEmail.style.color = '#f0a30a';
    missEmail.style.fontWeight = 'bolder';
    error = true;
  } else if (emailV.test(email.value) == false) {
    missEmail.textContent = 'Format incorrect';
    missEmail.style.color = 'red';
    missEmail.style.fontWeight = 'bolder';
    error = true;
  }

  if (error) {
    return false;
  }
  return true;
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