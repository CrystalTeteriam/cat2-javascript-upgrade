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


// FORM HANDLING WITH VALIDATION - F3


// Get form elements 
let feedbackForm = document.querySelector('#feedbackForm');
let feedbackOutput = document.querySelector('#feedbackOutput');

if (feedbackForm) {
    // submit event 
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // get values
        let name = document.querySelector('#fanName').value.trim();
        let email = document.querySelector('#fanEmail').value.trim();
        let message = document.querySelector('#fanMessage').value.trim();
        
        // Validate checking if empty
        let errors = [];
        
        if (name === '') {
            errors.push('Name is required');
        } else if (name.length < 2) {
            errors.push('Name must be at least 2 characters');
        }
        
        if (email === '') {
            errors.push('Email is required');
        } else if (!email.includes('@') || !email.includes('.')) {
            errors.push('Please enter a valid email address');
        }
        
        if (message === '') {
            errors.push('Message is required');
        } else if (message.length < 10) {
            errors.push('Message must be at least 10 characters');
        }
        
        // show feedback using innerHTML 
        if (errors.length > 0) {
            // showing errors using innerHTML
            feedbackOutput.innerHTML = '<div style="color: #ff4f87; border: 2px solid #ff4f87; padding: 15px; border-radius: 8px;">' +
                                       '<strong>❌ Please fix the following errors:</strong>' +
                                       '<ul>';
            
            // Looping through errors using forEach like you know!
            errors.forEach(function(err) {
                feedbackOutput.innerHTML = feedbackOutput.innerHTML + '<li>' + err + '</li>';
            });
            
            feedbackOutput.innerHTML = feedbackOutput.innerHTML + '</ul></div>';
            
        } else {
            // Show success yay using innerHTML like your lab!
            feedbackOutput.innerHTML = '<div style="color: #4ff6ea; border: 2px solid #4ff6ea; padding: 15px; border-radius: 8px;">' +
                                       '<strong>✅ Thank you, ' + name + '!</strong>' +
                                       '<p>Your feedback has been submitted successfully.</p>' +
                                       '<p><strong>Email:</strong> ' + email + '</p>' +
                                       '<p><strong>Message:</strong> ' + message + '</p>' +
                                       '</div>';
            
            // Clear form
            document.querySelector('#fanName').value = '';
            document.querySelector('#fanEmail').value = '';
            document.querySelector('#fanMessage').value = '';
        }
    });
}


//  PERSISTENT STATE (localStorage) F3


// Save wishlist to localStorage
function saveWishlist() {
    let items = [];
    // Getting all items using querySelectorAll
    let allItems = document.querySelectorAll('#wishlistItems li span');
    
    // Loop through them  foreach
    allItems.forEach(function(span) {
        items.push(span.textContent);
    });
    
    // localStorage is like permanent memory
    localStorage.setItem('javytechWishlist', JSON.stringify(items));
}

// loading tse wishlist from localStorage
function loadWishlist() {
    let saved = localStorage.getItem('javytechWishlist');
    if (saved) {
        // Parse the saved data - this turns it back into an array
        let items = JSON.parse(saved);
        let wishlistItems = document.querySelector('#wishlistItems');
        
        // Loop through saved items 
        items.forEach(function(itemName) {
            // Recreate each item 
            let li = document.createElement('li');
            li.className = 'wishlist-item';
            
            let span = document.createElement('span');
            span.textContent = itemName;
            
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = ' Remove me';
            deleteBtn.className = 'delete-btn';
            
            deleteBtn.addEventListener('click', function() {
                li.remove();
                saveWishlist();
            });
            
            li.appendChild(span);
            li.appendChild(deleteBtn);
            wishlistItems.appendChild(li);
        });
    }
}

// Load wishlist when page loads using DOMContentLoaded roho hii ni google 
document.addEventListener('DOMContentLoaded', loadWishlist);

// Theme toggle using localStorage to save preference  finally sometjing I know
let themeToggle = document.querySelector('#themeToggle');

if (themeToggle) {
    // Check saved theme
    let savedTheme = localStorage.getItem('javytechTheme');
    if (savedTheme === 'dark') { //applying the saved theme on the load
        document.body.classList.add('dark-mode');
         document.body.classList.remove('light-mode');
        themeToggle.textContent = 'Light Mode';
    
} else if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = 'Dark Mode';
    } else {
        // Normal mode (default)
        document.body.classList.remove('dark-mode', 'light-mode');
        themeToggle.textContent = '🌑 Dark Mode 🌑';
    }
    
//moving through norm ligh and dar
    themeToggle.addEventListener('click', function() {
        let currentTheme = localStorage.getItem('javytechTheme');
        
        
        if (currentTheme === 'dark') {
            // Dark → Light
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('javytechTheme', 'light');
            this.textContent = 'Normal mode';
            
        } else if (currentTheme === 'light') {
            // Light → Normal
            document.body.classList.remove('light-mode');
            document.body.classList.remove('dark-mode');
            localStorage.setItem('javytechTheme', 'normal');
            this.textContent = '🌑 Dark Mode 🌑';
            
        } else {
            // Normal → Dark
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            localStorage.setItem('javytechTheme', 'dark');
            this.textContent = '☀️ Light Mode';
        }
    
    });
}
