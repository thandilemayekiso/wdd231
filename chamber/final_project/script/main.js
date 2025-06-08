document.addEventListener('DOMContentLoaded', async () => {
  const catalogContainer = document.getElementById('catalog-container');

  try {
    const response = await fetch('data/catalog.json');
    if (!response.ok) {
      throw new Error('Failed to load catalog.json');
    }

    const items = await response.json();

    if (!Array.isArray(items) || items.length === 0) {
      catalogContainer.innerHTML = `<p>No catalog items found.</p>`;
      return;
    }

    items.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('catalog-item');

      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p class="price">${item.price}</p>
        <a href="booking.html?item=${encodeURIComponent(item.name)}" class="book-button">Book Now</a>
      `;

      catalogContainer.appendChild(card);
    });

  } catch (error) {
    console.error('Error loading catalog:', error);
    catalogContainer.innerHTML = `<p class="error">Error loading catalog: ${error.message}</p>`;
  }
});
