const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');
const shoppingList = document.getElementById('shoppingList');

let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Function to render the shopping list
function renderList() {
    shoppingList.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.text;
        li.className = item.purchased ? 'purchased' : '';
        
        // Mark as purchased
        li.addEventListener('click', () => {
            item.purchased = !item.purchased;
            saveToLocalStorage();
            renderList();
        });

        // Create "Mark as Purchased" button
        const purchasedButton = document.createElement('button');
        purchasedButton.textContent = 'Mark as Purchased';
        purchasedButton.addEventListener('click', function() {
            li.classList.toggle('purchased'); // Toggle the purchased class
        });

        // Edit item
        li.addEventListener('dblclick', () => {
            const newItem = prompt('Edit item:', item.text);
            if (newItem) {
                item.text = newItem;
                saveToLocalStorage();
                renderList();
            }
        });

        shoppingList.appendChild(li);
    });
}

// Function to save items to local storage
function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(items));
}

// Add item to the list
addButton.addEventListener('click', () => {
    const itemText = itemInput.value.trim();
    if (itemText) {
        items.push({ text: itemText, purchased: false });
        itemInput.value = '';
        saveToLocalStorage();
        renderList();
    }
});

// Clear the list
clearButton.addEventListener('click', () => {
    items = [];
    saveToLocalStorage();
    renderList();
});

// Initial render
renderList();