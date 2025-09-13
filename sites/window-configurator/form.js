const modelSelect = document.getElementById("model");
const colorOptionsContainer = document.getElementById("color-options");
const modelDisplay = document.getElementById("model-display");
const modelImgContainer = document.getElementById("model-img-container");
const modelInfo = document.getElementById("model-info");
const panierModal = document.getElementById("panier-modal");
const tooltip = document.getElementById("hover-tooltip");
const panierList = document.getElementById("panier-list");
let configData = {};
let panier = [];

// Function to fetch and load the config data
async function loadConfig() {
    try {
        const response = await fetch("config.json");
        configData = await response.json();
        // Update the model select options based on the config
        updateModelSelect();
        // Trigger initial display
        updateModelDisplay(modelSelect.value);
    } catch (error) {
        console.error("Error loading config.json:", error);
    }
}

function updateModelSelect() {
    modelSelect.innerHTML = ""; // Clear existing options
    for (const modelKey in configData) {
        const option = document.createElement("option");
        option.value = modelKey;
        option.textContent = configData[modelKey].name;
        modelSelect.appendChild(option);
    }
}

function renderColors(colors) {
    colorOptionsContainer.innerHTML = "";
    if (!colors || colors.length === 0) {
        colorOptionsContainer.innerHTML = '<p class="text-sm text-gray-500">No colors available for this model.</p>';
        return;
    }

    colors.forEach((color) => {
        const colorDiv = document.createElement("div");
        colorDiv.className = "flex items-center space-x-2";
        colorDiv.innerHTML = `
            <button type="button" class="color-option w-8 h-8 rounded-full shadow-sm hover:scale-110 transform transition-transform duration-200" style="background-color: ${color.hex};" data-color="${color.name}" data-hex="${color.hex}"></button>
            <span class="text-sm text-gray-700">${color.name}</span>
        `;
        colorOptionsContainer.appendChild(colorDiv);
    });

    const firstColorButton = colorOptionsContainer.querySelector(".color-option");
    if (firstColorButton) {
        firstColorButton.classList.add("selected");
        firstColorButton.style.border = "2px solid #4a5568";
        firstColorButton.style.boxShadow = "0 0 0 2px #4a5568";
    }
}

function updateModelDisplay(selectedModel) {
    const model = configData[selectedModel];
    if (model) {
        modelImgContainer.innerHTML = `<img src="${model.image}" alt="${model.name}" class="rounded-md w-full h-auto">`;
        modelInfo.innerHTML = `<h2 class="text-lg font-semibold">${model.name}</h2>`;
        renderColors(model.availableColors);
    }
}

modelSelect.addEventListener("change", (e) => {
    updateModelDisplay(e.target.value);
});

colorOptionsContainer.addEventListener("click", (e) => {
    const button = e.target.closest(".color-option");
    if (button) {
        document.querySelectorAll(".color-option").forEach((btn) => {
            btn.classList.remove("selected");
            btn.style.border = "2px solid transparent";
            btn.style.boxShadow = "none";
        });
        button.classList.add("selected");
        button.style.border = "2px solid #4a5568";
        button.style.boxShadow = "0 0 0 2px #4a5568";
    }
});

// New function to add the current configuration to the cart
function addToPanier() {
    const formData = new FormData(document.getElementById("product-form"));
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    
    // Get the selected model and color details
    const selectedModelKey = modelSelect.value;
    const selectedModel = configData[selectedModelKey];
    const selectedColorButton = document.querySelector(".color-option.selected");

    const item = {
        id: Date.now(), // Unique ID for each item
        model: selectedModel.name,
        image: selectedModel.image, // Add the image URL here
        color: selectedColorButton.dataset.color,
        colorHex: selectedColorButton.dataset.hex,
        height: data.height,
        length: data.length,
        quantity: data.quantity,
        note: data.note,
    };

    panier.push(item);

    // Show a success message
    const messageBox = document.createElement("div");
    messageBox.className = "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-6 rounded-lg shadow-xl z-50";
    messageBox.innerHTML = `<h3 class="text-xl font-bold mb-2">Added to Cart!</h3><p>Your item has been added to the cart.</p>`;
    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.remove();
    }, 2000);
}

// Function to render the cart items in the modal
function renderPanier() {
    const panierList = document.getElementById("panier-list");
    const emptyMessage = document.getElementById("empty-panier-message");
    panierList.innerHTML = "";
    
    if (panier.length === 0) {
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden');
        panier.forEach((item, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "panier-item relative";
            itemDiv.dataset.index = index;
            itemDiv.innerHTML = `
                <div>
                    <h4 class="font-semibold">${item.model} x ${item.quantity}</h4>
                    <p class="text-sm text-gray-600">${item.height}cm x ${item.length}cm</p>
                </div>
                <button onclick="removeFromPanier(${index})" class="text-red-500 hover:text-red-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-9V6a1 1 0 00-1-1H9a1 1 0 00-1 1v1m.588-.588a2 2 0 012.828 0" />
                    </svg>
                </button>
            `;
            panierList.appendChild(itemDiv);
        });
    }
}

// Function to remove an item from the cart
function removeFromPanier(index) {
    panier.splice(index, 1);
    renderPanier();
    console.log("Panier updated:", panier);
}

// Function to handle the hover tooltip
function showTooltip(item) {
    tooltip.innerHTML = `
        <img src="${item.image}" alt="${item.model}" class="w-20 h-20 mb-2 rounded-md object-cover">
        <p class="flex items-center">
            <strong class="mr-1">Color:</strong>
            <span class="inline-block w-4 h-4 rounded-full border border-gray-300" style="background-color: ${item.colorHex};"></span>
            <span class="ml-1">${item.color}</span>
        </p>
        <p><strong>Note:</strong> ${item.note || 'N/A'}</p>
    `;
    tooltip.classList.remove('hidden');
}

function hideTooltip() {
    tooltip.classList.add('hidden');
}

// Updated event listeners for the cart items to make the tooltip fluid
panierList.addEventListener('mouseover', (e) => {
    const itemElement = e.target.closest('.panier-item');
    if (itemElement) {
        const index = itemElement.dataset.index;
        const item = panier[index];
        showTooltip(item);
    }
});

panierList.addEventListener('mousemove', (e) => {
    const itemElement = e.target.closest('.panier-item');
    if (itemElement) {
        // Update tooltip position continuously
        tooltip.style.top = `${e.clientY + 15}px`;
        tooltip.style.left = `${e.clientX + 15}px`;
    }
});

panierList.addEventListener('mouseout', (e) => {
    const itemElement = e.target.closest('.panier-item');
    // Hide tooltip if the mouse is moving off of the item and not just to a child element
    if (itemElement && !itemElement.contains(e.relatedTarget)) {
        hideTooltip();
    }
});

// Function to toggle the cart modal visibility
function togglePanierModal() {
    const modal = document.getElementById('panier-modal');
    if (modal.classList.contains('hidden')) {
        renderPanier();
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}

// New function to "Ask for Devis" (quote)
function askForDevis() {
    if (panier.length === 0) {
        const messageBox = document.createElement("div");
        messageBox.className = "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-6 rounded-lg shadow-xl z-50";
        messageBox.innerHTML = `<h3 class="text-xl font-bold mb-2">Cart Empty</h3><p>Please add items to your cart before asking for a quote.</p>`;
        document.body.appendChild(messageBox);
        setTimeout(() => {
            messageBox.remove();
        }, 3000);
        return;
    }

    // Get contact info from the form
    const formData = new FormData(document.getElementById("product-form"));
    const contactInfo = {
        fullName: formData.get("full-name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
    };

    const quoteData = {
        contactInfo: contactInfo,
        panier: panier,
    };

    console.log("Quote data:", quoteData);

    const messageBox = document.createElement("div");
    messageBox.className = "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white p-6 rounded-lg shadow-xl z-50";
    messageBox.innerHTML = `
        <h3 class="text-xl font-bold mb-4">Quote Request Sent!</h3>
        <p>Thank you for your request. We will contact you shortly.</p>
        <button onclick="this.parentNode.remove()" class="mt-4 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800">Close</button>
    `;
    document.body.appendChild(messageBox);
}

// Initial rendering - load the config file
window.onload = loadConfig;
