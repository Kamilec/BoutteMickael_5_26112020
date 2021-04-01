function upDateQte() {
  let qte = localStorage.length;
  document.getElementById('shop').innerHTML = qte;
}
upDateQte();