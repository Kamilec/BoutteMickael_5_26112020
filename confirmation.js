let orderIdContainer = document.getElementsByClassName('order-id-value')[0];
let cartTotalContainer = document.getElementsByClassName('price-final')[0];
let orderId = localStorage.getItem('orderId');
let cartTotal = localStorage.getItem('cartTotal');

orderIdContainer.innerHTML = orderId;
cartTotalContainer.innerHTML = cartTotal;