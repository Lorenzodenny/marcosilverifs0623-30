const urlApi = 'https://striveschool-api.herokuapp.com/api/product/';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZGYxYzBkOGEyMDAwMThhNDhiOTUiLCJpYXQiOjE3MDIwMjcwMzYsImV4cCI6MTcwMzIzNjYzNn0.HgqZRFg1o2CmyOjS_DdpzYeaOYHjVCdHMJLDCopWAHQ";
const apiCont = document.querySelector(".row")

const options = {
    headers: {
        Authorization: `Bearer ${token}`
    } 
}; 

fetcherProdotti(urlApi, options)

async function fetcherProdotti(url, options){
    const respone = await fetch (url, options)
    const prodotti = await respone.json()

    console.log(prodotti)

    function creazioneCard() {
        let prodottiApiContainer = "";
        prodotti.forEach(prodotto => {
          prodottiApiContainer +=  `
            <div class="card col-3 mx-4 my-3">
              <img src= ${prodotto.imageUrl} class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title"> ${prodotto.name} </h5>
                <p class="card-text"> ${prodotto.brand} </p>
                <p class="card-text"> ${prodotto.description} </p>
                <p class="card-text"> ${prodotto.price} </p>
                <a href="#" class="btn btn-success diPiu" data-id="${prodotto._id}">Scopri di più</a>
                <a href="#" class="btn btn-danger modifica" data-id="${prodotto._id}"> Modifica</a>
              </div>
            </div>
          `;  
        });
      
        apiCont.innerHTML = prodottiApiContainer;
      
        const btnDiPiuArray = document.querySelectorAll('.diPiu');
        btnDiPiuArray.forEach(btn => {
          btn.addEventListener('click', function(event) {
            
            const productId = event.target.getAttribute('data-id');
      
            
            window.location.href = `details.html?id=${productId}`;
            
          });
          
        });

        const btnModificaArray = document.querySelectorAll('.modifica');
        btnModificaArray.forEach(btn => {
          btn.addEventListener('click', function(event) {
            
            const productId = event.target.getAttribute('data-id');
      
            
            window.location.href = `modifica.html?id=${productId}`;
            
          });
          
        });

      }
      creazioneCard()
    }
    

