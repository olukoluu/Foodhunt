const hamMenu = document.querySelector('.hammenu');
const hamClose = document.querySelector('.hamclose');
const navBar = document.querySelector('.navbar');
const cartEl = document.querySelectorAll('.cartel');
const cartBoard = document.querySelector('.cart_board');
const cartClose = document.querySelector('.cartclose');

hamMenu.addEventListener('click', ()=>{
    navBar.classList.replace('hidden', 'block');
    navBar.classList.add('fixed', 'pl-5', 'w-full');
    hamClose.classList.replace('hidden', 'block');
    hamMenu.classList.add('hidden');
});

hamClose.addEventListener('click', ()=>{
    navBar.classList.replace('block', 'hidden');
    navBar.classList.remove('fixed', 'pl-5', 'w-full');
    hamClose.classList.replace('block', 'hidden');
    hamMenu.classList.remove('hidden');
});

for (let i = 0; i < cartEl.length; i++) {
    cartEl[i].addEventListener('click', ()=>{
        cartBoard.classList.replace('hidden', 'block');
    });    
}

cartClose.addEventListener('click', ()=>{
    cartBoard.classList.replace('block', 'hidden')
});





//cart functionalities
const cartItems = document.querySelector('.cartitems');
const cartItem = document.querySelectorAll('.cartitem');
const addToCartBtns = document.querySelectorAll('.addbtn');
const checkOutBtn = document.querySelector('.checkout');
const cartCountEl = document.querySelectorAll('.cart_count span');

countChange()
removeCartItem()
updatePrice()
cartCount()

function cartCount() {
    
    for (let i = 0; i < cartCountEl.length; i++) {
        const element = cartCountEl[i];
        
    element.textContent = cartItems.children.length
    }
}

checkOutBtn.addEventListener('click', ()=>{
    if (cartItems.innerHTML == "") {
        alert('Cart is Empty')
    } else {
        cartItems.innerHTML = ''
        alert('Your Order is on it Way')
        updatePrice()  
        cartCount()
    }
})

//loop through the cart items and update total price
//get the price and quantity, multiply it together
//and return the total
function updatePrice() {

    let itemCount = document.querySelectorAll('.itemcount');
    let totalEl = document.querySelector('.total');
    let total = 0
    
    for (let i = 0; i < itemCount.length; i++) {
        const element = itemCount[i];
        let priceEl = element.querySelector('h2');
        let quantityEl = element.querySelector('.amount');
        let price = priceEl.textContent.replace('N', '');
        let quantity = quantityEl.value;
        total += price * quantity
    
    }
    totalEl.textContent = 'N' + total;

}

//onclicking Add To Cart button 
// get the title, price and img of the button clicked
//call deisplayItem()
//call updatePrice fn
for (let i = 0; i < addToCartBtns.length; i++) {
    const addBtn = addToCartBtns[i];
    addBtn.addEventListener('click', ()=>{
        let cardText = addBtn.parentElement
        let title = cardText.querySelector('h3').textContent;
        let price = cardText.querySelector('h5').textContent;
        let cardItem = cardText.parentElement;
        let imgSrc = cardItem.querySelector('img').src
        // console.log(title, price, imgSrc)
        displayItem(title, price, imgSrc)
        updatePrice()
    })

}
    

// onclicking the remove btn of each cart item
//remove the parentnode(the cart item)
// call updatePrice fn
function removeCartItem() {
    const removeItemBtns = cartItems.querySelectorAll('.itemremove');
    
    for (let i = 0; i < removeItemBtns.length; i++) {
            const element = removeItemBtns[i];
        element.addEventListener('click', (event)=>{
        let btnClicked = event.target;
        btnClicked.parentNode.remove();
            updatePrice();
            cartCount()
        })
        
    }
        
}


//if item title is already in the cart alert'item is already in the cart'
//else add the cartitem div to cartitems container
//call removeCartItem fn
//call countChange fn
function displayItem(name, prc, img) {
    let itemTitle = cartItems.querySelectorAll('.name');
    for (let i = 0; i < itemTitle.length; i++) {
        const element = itemTitle[i];
        if (element.textContent == name) {
            alert('Item is already in the Cart')
            return
        }
        
    }
    cartItems.innerHTML += `
    <div class="cartitem flex gap-5 p-2 border-b border-orange-500">
        <img src="${img}" alt="" class="h-20 w-1/4 ">
        <div class="carttxt flex flex-col w-3/5">
            <h3 class="name text-sm">${name}</h3>
            <div class="itemcount flex gap-1 mt-2 font-medium text-xl">
                <h2 class="mr-10 text-lg">${prc}</h2>
                <span class="increase cursor-pointer bg-orange-500 px-2">&#43;</span>
            <input type="number" name="amount" value="1" id="amount" class="amount border border-orange-500 w-8 text-center text-base">
                <span class="decrease cursor-pointer bg-orange-500 px-2">&#8722;</span>
            </div>
        </div>
            <span class="itemremove cursor-pointer text-4xl font-bold flex justify-center items-center">&times;</span>
    </div>`

    cartCount()
    removeCartItem()
    countChange()
}



//increase and decrease btn of the cart item
function countChange() {
    
let increaseBtnEl = document.querySelectorAll('.increase');
let decreaseBtnEl = document.querySelectorAll('.decrease');

for (let i = 0; i < increaseBtnEl.length; i++) {
    const increaseBtn = increaseBtnEl[i];
    increaseBtn.addEventListener('click', ()=>{
        let itemCount = increaseBtn.parentElement;
        let inputValue = itemCount.querySelector('.amount'); 
        if(inputValue.value >= 5){
            inputValue.value = 5;
        }else{
        inputValue.value++
        }
        inputValue.addEventListener('change', updatePrice())
    })
    
}

for (let i = 0; i < decreaseBtnEl.length; i++) {
    const decreaseBtn = decreaseBtnEl[i];
    decreaseBtn.addEventListener('click', ()=>{
        // alert('decrease')
        let itemCount = decreaseBtn.parentElement;
        let inputValue = itemCount.querySelector('.amount');
        
            if(inputValue.value == '' || inputValue.value <= 1){
                itemCount.parentElement.parentElement.remove()
                cartCount()
            } else{
                inputValue.value--
            }
            inputValue.addEventListener('change', updatePrice())
    })
    
}

}

