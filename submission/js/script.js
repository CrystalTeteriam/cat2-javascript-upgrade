//LOOP-RENDERED DYNAMIC CONTENT- F1
const featuredProducts = [
    { name: "Ulefone Power Armor 17 Pro", price: "KSh 28,000", category: "Phones" },
    { name: "MAONO MH700 Gaming Headset", price: "KSh 6,500", category: "Audio" },
    { name: "LENSGO Smoke Master PRO", price: "KSh 14,000", category: "Cameras" },
    { name: "Amazfit Active Max", price: "KSh 23,999", category: "Wearables" },
    { name: "Canon EOS 2000D", price: "KSh 45,000", category: "Cameras" },
    { name: "Samsung Galaxy S24", price: "KSh 85,000", category: "Phones" }
];

function renderProducts() {
    // Get container 
    let container = document.querySelector('#dynamic-products');
    if (!container) return;
    
    // claer / reset 
    container.innerHTML = '';
    
    // LOOP through products just like governors.forEach()
   
    featuredProducts.forEach(function(product) {
        // Create elements 
        let div = document.createElement('div');
        div.className = 'product-card';
        
        // Add content
        div.innerHTML = '<h3>' + product.name + '</h3>' +
                       '<div class="product-specs">' + product.category + '</div>' +
                       '<div class="price">' + product.price + '</div>';
        
        // Append 
        container.appendChild(div);
    });
}

//runs when page is loaded
document.addEventListener('DOMContentLoaded', renderProducts);

// DYNAMIC ADD & REMOVE (Wishlist)-F2

// Get elements
let wishlistForm = document.querySelector('#wishlistForm');
let wishlistInput = document.querySelector('#wishlistInput');
let wishlistItems = document.querySelector('#wishlistItems');

// Add item case 6 lab
if (wishlistForm) {
    wishlistForm.addEventListener('submit', function(e) {
        // prevent refresh 
        e.preventDefault();
        
        let itemName = wishlistInput.value.trim();
        
        // check if empty 
        if (itemName === '') {
            alert('Please enter an item!');
            return;
        }
        
        //Create list item 
        let li = document.createElement('li');
        li.className = 'wishlist-item';
        
        // Create span for text
        let span = document.createElement('span');
        span.textContent = itemName;
        
        //   Create delete button 
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = ' Remove me';
        deleteBtn.className = 'delete-btn';
        
        // adding delete functionality 
        deleteBtn.addEventListener('click', function() {
            li.remove(); // You know remove() from lab!
            saveWishlist(); // We'll add this later
        });
        
    
        li.appendChild(span);
        li.appendChild(deleteBtn);
        wishlistItems.appendChild(li);
        
        // clear or reset input 
        wishlistInput.value = '';
        
        saveWishlist();
    });
}