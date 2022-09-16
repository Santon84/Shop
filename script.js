
const items = document.querySelectorAll('.review-wrapper');
const itemsCount = items.length;

const wrapper = document.querySelector('.reviews-wrapper');
let screenWidth = document.getElementById('review-1').offsetWidth
const maxWidth = wrapper.clientWidth * itemsCount;
console.log('first ' + screenWidth);

let left = 0;






document.getElementById('r-arr').addEventListener('click', (e) => {
    e.preventDefault();

    screenWidth = document.getElementById('review-1').offsetWidth; 
    console.log(screenWidth);
    if (left <= screenWidth) {
    left += screenWidth;
    wrapper.style.left = `-${left}px`;
    }
    console.log('right clicked');
})


document.getElementById('l-arr').addEventListener('click', (e) => {
    e.preventDefault();
    if (left >= screenWidth) {
        left -= screenWidth;
        wrapper.style.left = `-${left}px`;
    }
    console.log('left clicked');
})


const cartButtons = document.querySelectorAll('.add-to-cart');

cartButtons.forEach(button => {

    button.addEventListener('click', (e) => {

        let btn = e.target.parentElement;
        

        let price = btn.querySelector('.price').innerText;
        let title = btn.querySelector('.product-title').innerText;
        let img = btn.querySelector('.product-image-wrapper img').src;
        let inCart = false;

        const cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach(item => {
            if (item.querySelector('.cart-item-title').innerText === title && !inCart) {
                item.querySelector('.cart-item-qty-counter').value = `${Number(item.querySelector('.cart-item-qty-counter').value)+ 1}`;
                inCart = true;
                
                let total = Number(item.querySelector('.cart-item-qty-counter').value) * Number(item.querySelector('.cart-item-price').innerText)
                item.querySelector('.cart-item-total-price').innerText=total; 
            }
        })
        if (inCart) {
            openCart();
            countCartItems();
            return
        }

        let itemHtml = document.createElement('div');
        itemHtml.innerHTML = `<div class="cart-item">
        <div class="cart-item-image-conteiner">
            <img src="${img}" alt="" class="cart-item-image">
        </div>
        <div class="cart-item-title">${title}</div>
        <div class="cart-item-price">${price}</div>
        <input class="cart-item-qty-counter" type="number" value="1" step="1" min="1" max="100">
        <div class="cart-item-total-price">${price}</div>
        <button class="cart-remove-btn">X</button>
        </div>`
        const cartItemsConteiner = document.querySelector('.cart-items');
        cartItemsConteiner.appendChild(itemHtml);
        openCart();
        countCartItems();
    })
})
const openCart = () => {
    const cartOverlay = document.querySelector('.overlay-modal');
    const cartModal = document.querySelector('.cart-modal');
    cartModal.classList.add('active');
    cartOverlay.classList.add('active');
    renderCartTotal();
    const body = document.querySelector('body');
    body.classList.add('modal-open');
}

document.querySelector('.open-cart-button').addEventListener('click', () => {
    openCart();
    
})

document.querySelector('.cart-close-button').addEventListener('click', () => {

    const cartOverlay = document.querySelector('.overlay-modal');
    const cartModal = document.querySelector('.cart-modal');
    cartModal.classList.remove('active');
    cartOverlay.classList.remove('active');
    const body = document.querySelector('body');
    body.classList.remove('modal-open');
})


document.addEventListener('change', (e) => {
    if (e.target.classList.contains("cart-item-qty-counter")) {
    console.log(e.target.parentElement)
    const item = e.target.parentElement;
    
    const price = item.querySelector('.cart-item-price').innerText;
    const qty = item.querySelector('.cart-item-qty-counter').value;
    let total = Number(qty) * Number(price);
    item.querySelector('.cart-item-total-price').innerText=total;
    renderCartTotal();
    countCartItems();
    }
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains("cart-remove-btn")) {
        e.target.parentElement.remove(e.target.parentElement);
        renderCartTotal();
        countCartItems();
    }
})



const renderCartTotal = () => {
    let total = 0;
    const totalHolder = document.querySelector('.cart-total-sum');
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(cartItem => {
        total += Number(cartItem.querySelector('.cart-item-total-price').innerText);
    })
    totalHolder.innerText = total;
}

const countCartItems = () => {
    const cartItems = document.querySelectorAll('.cart-item');
    let itemsCount = 0;
    cartItems.forEach(cartItem => {
        itemsCount++;
    })
    const cartCountDisplay = document.querySelector('.icons');
    cartCountDisplay.setAttribute('data-count',itemsCount);
}
countCartItems();



document.querySelector('.burger').addEventListener('click', () => {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');
    burger.classList.toggle('active');
    menu.classList.toggle('active');

})