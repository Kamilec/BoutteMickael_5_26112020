let orderIdContainer = document.getElementsByClassName('order-id-value')[0];
let orderId = localStorage.getItem('orderId');
let finalPriceContainer = document.getElementsByClassName('price-final')[0];
let finalPrice = localStorage.getItem('finalPrice');

let firstNameContainer = document.getElementById('first-Name');
let firstNameValue = localStorage.getItem('firstName');
let lastNameContainer = document.getElementById('last-Name');
let lastNameValue = localStorage.getItem('lastName');
let mailContainer = document.getElementById('e-mail');
let emailValue = localStorage.getItem('email');

finalPriceContainer.innerHTML = finalPrice;
firstNameContainer.innerHTML = firstNameValue;
lastNameContainer.innerHTML = lastNameValue;
mailContainer.innerHTML = emailValue;
orderIdContainer.innerHTML = orderId;

localStorage.clear();