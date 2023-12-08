const urlApi = 'https://striveschool-api.herokuapp.com/api/product/';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZGYxYzBkOGEyMDAwMThhNDhiOTUiLCJpYXQiOjE3MDIwMjcwMzYsImV4cCI6MTcwMzIzNjYzNn0.HgqZRFg1o2CmyOjS_DdpzYeaOYHjVCdHMJLDCopWAHQ";
const apiCont = document.querySelector(".row")
let eleApiCont = ""

function submitForm() {
  let name = document.getElementById('name').value;
  let description = document.getElementById('description').value;
  let brand = document.getElementById('brand').value;
  let imageUrl = document.getElementById('imageUrl').value;
  let price = document.getElementById('price').value;

  let prodotto = {
    name: name,
    description: description,
    brand: brand,
    imageUrl: imageUrl,
    price: price,
  };

  fetch(urlApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(prodotto)
  })
  .then(response => {
  console.log(response.status);
  return response.json();
})
.then(prodotto => {
  console.log(urlApi, prodotto);
  eleApiCont += `
    <div class="card col-3 mx-4 my-3">
      <img src= ${prodotto.imageUrl} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title"> ${prodotto.name} </h5>
        <p class="card-text"> ${prodotto.brand} </p>
        <p class="card-text"> ${prodotto.description} </p>
        <p class="card-text"> ${prodotto.price} </p>
      </div>
    </div>
  `;
  apiCont.innerHTML = eleApiCont;
  
  document.getElementById('name').value = ""
  document.getElementById('description').value =""
  document.getElementById('brand').value =""
  document.getElementById('imageUrl').value =""
  document.getElementById('price').value =""
})
.catch(error => {
  console.error('Errore durante la richiesta:', error);
  return error.response.json();
})
.then(errorData => {
  console.log('Dettagli errore:', errorData);
  
});

}
