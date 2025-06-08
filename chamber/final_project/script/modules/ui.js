export function displayCatalog(data) {
  const container = document.querySelector('#catalog-container');
  container.innerHTML = ''; // Clear before re-rendering
  data.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('catalog-card');
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p><strong>R${item.price}</strong></p>
    `;
    container.appendChild(card);
  });
}

export function setupModal() {
  // optional modal behavior
}

export function setupFilter(data) {
  const select = document.querySelector('#category-filter');
  select.addEventListener('change', (e) => {
    const value = e.target.value;
    const filtered = value === 'all' ? data : data.filter(item => item.category === value);
    displayCatalog(filtered);
  });
}
