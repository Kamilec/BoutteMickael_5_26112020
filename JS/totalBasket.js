function upDateQte() {
  let qte = localStorage.length;
  document.getElementById('shop').innerHTML = qte;
}
upDateQte();

let totalPrice = () => {
  let allPrice = document.getElementsByClassName('price-total');
  let price = 0;
  for (let element of allPrice) {
    price += parseInt(element.innerHTML);
  }
  document.getElementById('price-final').innerHTML = price;
};
totalPrice();