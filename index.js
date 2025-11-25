import { menuArray } from "/data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let cart = []

document.addEventListener('click', function(e){
    
    
    // Vado a cercare il prodotto clickato nell'array e lo pusho nel Carrello
    
    if(e.target.dataset.item){    
       aggiungiAlCarrello(e.target.dataset.item) 
       renderCart()       
    }
    if(e.target.dataset.remove){    
       rimuoviDalCarrello(e.target.dataset.remove) 
       renderCart()       
    }
    if(e.target.classList.contains('btn-complete')){
    document.getElementById('payment-modal').classList.remove('hidden')
    }
    
})

document.getElementById('payment-form').addEventListener('submit', function(e){
    e.preventDefault() // blocca il reload
    // qui il required è già stato validato automaticamente!
    chiudiOrdine()

})


function getMenuHtml(){
    
    let menuHTML = ''

    menuArray.forEach(function(item){


        menuHTML += 
        `<article class="menu-item">
            <div class="menu-item__icon">${item.emoji}</div>
            <div class="menu-item__info">
                <h2 class="menu-item__name">${item.name}</h2>
                <p class="menu-item__ingredients">${item.ingredients.join(', ')}</p>
                <p class="menu-item__price">€ ${item.price}</p>
            </div>
            <button class="menu-item__btn" data-item="${item.name}">+</button>
        </article>`
        

    })

    return menuHTML

}
function sommaElementi(carrello){

    const totale = carrello.reduce((acc, item) => acc + item.price, 0)
    return totale
}

function render(){

    document.getElementById('menu').innerHTML = getMenuHtml()

}

function renderCart()
{
        let cartHtml = ''
        
        cart.forEach(function(item){    
        cartHtml += 
        `<div class="cart-item">
        <div class="cart-item__info">
            <span class="cart-item__name">${item.name}</span>
            <button class="cart-item__remove" data-remove="${item.id}">remove</button>
            
        </div>
            <span class="cart-item__price">€ ${item.price}</span>
        </div>`
        })
        
        //faccio la somma degli elementi del carrello e poi la sparo nell'HTML
        
        document.getElementById('cart-items').innerHTML = cartHtml
        document.getElementById('total-price').textContent ="€ " + sommaElementi(cart)
        

}

function aggiungiAlCarrello(nomeProdotto){

        document.getElementById("cart").classList.remove('hidden')
        const prodottoClicckato = menuArray.find(prodotto => prodotto.name === nomeProdotto)
        cart.push({
            ...prodottoClicckato,
            id: uuidv4()
        })
}

function rimuoviDalCarrello(idProdotto){

    const elementoDaRimuovere = cart.findIndex(function(prodotto){
        return prodotto.id === idProdotto
    })

    if(elementoDaRimuovere != -1){
        cart.splice(elementoDaRimuovere,1)
    }

}

function chiudiOrdine(){

    document.getElementById('payment-modal').classList.add('hidden')
    const nomeUtente = document.getElementById("name").value
    cart = []
    document.getElementById('cart').innerHTML = `<p class="thank-you-message">Thanks ${nomeUtente}, your order is on its way!</p>`

}

render()
