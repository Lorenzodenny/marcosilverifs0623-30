const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZGYxYzBkOGEyMDAwMThhNDhiOTUiLCJpYXQiOjE3MDIwMjcwMzYsImV4cCI6MTcwMzIzNjYzNn0.HgqZRFg1o2CmyOjS_DdpzYeaOYHjVCdHMJLDCopWAHQ";
const urlApi = 'https://striveschool-api.herokuapp.com/api/product/';
const contenitoreCard = document.querySelector("#contenitore1")
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
      <form id="apiForm">

      <label for="description" class="d-flex flex-column mt-5">Il Name del prodotto che sta gestendo è:</label>
      <input type="text" id="name" name="description" value=${cardStampata.name} disabled>

      <label for="description" class="d-flex flex-column mt-5">Description:</label>
      <input type="text" id="description" name="description" value=${cardStampata.description} required>

      <label for="brand" class="d-flex flex-column mt-5">Brand:</label>
      <input type="text" id="brand" name="brand" value=${cardStampata.brand} required>

      <label for="imageUrl" class="d-flex flex-column mt-5">imageUrl:</label>
      <input type="text" id="imageUrl" name="imageUrl" value=${cardStampata.imageUrl} required>

      <label for="prince" class="d-flex flex-column mt-5">Price:</label>
      <input type="number" id="price" name="price" value=${cardStampata.price} required>

  </form>
      
     <div>
     <button class="btn btn-primary" type="reset" onclick="resetForm()">Reset Form</button>
     </div>

     <div>
     <button class="btn btn-primary" onclick="cancella()">Elimina Risorse</button>
     </div>

     <div>
     <button class="btn btn-primary"  onclick="modifica()">Applica Modifiche</button>
     </div>
    </div>
    
       `
        
       contenitoreCard.innerHTML = prodottoStampato

 
}

function resetForm(){
    let result = confirm('Are you sure?')
    if(result === true){
    document.querySelector("#description").value = ""
    document.querySelector("#brand").value = ""
    document.querySelector("#imageUrl").value = ""
    document.querySelector("#price").value = ""
}else{
    alert('form not reset ')
}
}

function cancella(){
    let result = confirm('Are you sure?')
    if(result === true){
 fetch( urlApi + id, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        } 
    })
    const form = document.querySelector("#apiForm")
    form.remove()
  prodottoStampato = `
   <p> Prodotto Cancellato Con Successo </p>
  `
  contenitoreCard.innerHTML = prodottoStampato
}else{
    alert('form not deleted ')
}
}


function modifica() {
    let result = confirm('Are you sure?')
    if(result === true){
    fetch(urlApi + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            description: document.querySelector("#description").value,
            brand   : document.querySelector("#brand").value,
            imageUrl: document.querySelector("#imageUrl").value,
            price: document.querySelector("#price").value,
        })
    })
    .then(response => {
        const form1 = document.querySelector("#contenitore1")
        form1.innerHTML = `
        <p> Prodotto Modificato Correttamente
        `
        return response.json();
    })
    }else{
        alert('form not edit')
    }
}


