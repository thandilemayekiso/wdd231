// scripts/catalog.js

const catalogContainer = document.getElementById('catalog-container');
const categoryFilter = document.getElementById('category-filter');

let catalogData = [];

// Fetch catalog data from JSON file
async function loadCatalog() {
  try {
    const response = await fetch('data/catalog.json');
    if (!response.ok) throw new Error('Failed to load catalog data');
    catalogData = await response.json();
    displayCatalog(catalogData);
  } catch (error) {
    console.error('Error fetching catalog:', error);
    catalogContainer.innerHTML = '<p>Failed to load catalog. Please try again later.</p>';
  }
}

// Render catalog cards
function displayCatalog(items) {
  catalogContainer.innerHTML = ''; // Clear container

  if (items.length === 0) {
    catalogContainer.innerHTML = '<p>No items match this category.</p>';
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('catalog-card');
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" loading="lazy" />
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p class="price">R${item.price}</p>
    `;
    catalogContainer.appendChild(card);
  });
}

// Filter catalog based on selected category
function filterCatalog(category) {
  if (category === 'all') {
    displayCatalog(catalogData);
  } else {
    const filtered = catalogData.filter(item => item.category === category);
    displayCatalog(filtered);
  }
}

// Event listener for filter
categoryFilter.addEventListener('change', (e) => {
  filterCatalog(e.target.value);
});

// Initialize
document.addEventListener('DOMContentLoaded', loadCatalog);
