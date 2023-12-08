const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZGYxYzBkOGEyMDAwMThhNDhiOTUiLCJpYXQiOjE3MDIwMjcwMzYsImV4cCI6MTcwMzIzNjYzNn0.HgqZRFg1o2CmyOjS_DdpzYeaOYHjVCdHMJLDCopWAHQ";
const urlApi = 'https://striveschool-api.herokuapp.com/api/product/';
const contenitoreCard = document.querySelector("#contenitore")
let prodottoStampato = ""

const options = {
    headers: {
        Authorization: `Bearer ${token}`
    } 
}; 


const searchParams = new URLSearchParams(window.location.search)

const id = searchParams.get("id")

window.onload = async () => {
    const resp = await fetch( urlApi + id, {
        headers: {
            Authorization: `Bearer ${token}`
        } 
    })

    const cardStampata = await resp.json()
    
    prodottoStampato = `
    <div>
       <h1>Il prodotto selezionato è:</h1>
       <h2>Nome prodotto: ${cardStampata.name} </h2>
       <img src="${cardStampata.imageUrl}" alt="">
       <p>${cardStampata.description}</p>
       <p>${cardStampata.price}</p>
    </div>
       `

       contenitoreCard.innerHTML = prodottoStampato

       const btnModificaArray = document.querySelectorAll('.modifica');
        btnModificaArray.forEach(btn => {
          btn.addEventListener('click', function() {
            
            window.location.href = `modifica.html?id=${cardStampata._id}`;
            
          });
          
        });
}

