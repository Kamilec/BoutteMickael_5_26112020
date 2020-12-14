// URL de l'api
const backendUrl = 'http://localhost:3000/api/cameras';

async function getData(url) {
  const res = await fetch(url);
  const text = await res.text();
  return text;
}

getData(backendUrl)
  .then(function getProducts(result) {
    const listP = JSON.parse(result);
    for (let i = 0; i < listP.length; i++) {
      console.log(listP[i]);

      const productName = document.createElement('p');
      productName.setAttribute('id', listP[i]._id);
      productName.innerHTML = listP[i].name;

      const myPrice = document.createElement('p');
      myPrice.setAttribute('class', 'prix');
      myPrice.innerHTML = listP[i].price;
      productName.append(myPrice);

      const img = document.createElement('img');
      img.setAttribute('src', listP[i].imageUrl);
      img.setAttribute('style', 'height: 50px; width: auto;');
      productName.append(img);
      console.log(productName);

      const maDescription = document.createElement('p');
      maDescription.setAttribute('class', 'description');
      maDescription.innerHTML = listP[i].description;
      productName.append(maDescription);

      document.getElementById('products').append(productName);
    }
  })
  .catch(function requestError(err) {
    console.error(err);
  });
