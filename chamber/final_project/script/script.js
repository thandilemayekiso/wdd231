/* main.js */

import { displayCatalog, setupModal } from './modules/ui.js';

async function fetchCatalog() {
  try {
    const response = await fetch('../data/catalog.json');
    if (!response.ok) throw new Error('Data load failed');
    const data = await response.json();
    displayCatalog(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchCatalog();
  setupModal();
});
