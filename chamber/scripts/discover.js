// FETCH AND RENDER CARDS
fetch('data/discover.json')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load JSON');
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('discover-cards');
    if (container) {
      data.points.forEach(point => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <h2>${point.title}</h2>
          <figure>
            <img src="${point.image}" alt="${point.title}" loading="lazy">
          </figure>
          <address>${point.address}</address>
          <p>${point.description}</p>
          <button onclick="window.open('${point.link}', '_blank')">Learn More</button>
        `;
        container.appendChild(card);
      });
    }
  })
  .catch(error => {
    console.error('Error loading discover content:', error);
    const container = document.getElementById('discover-cards');
    if (container) {
      container.innerHTML = "<p>Failed to load discover content.</p>";
    }
  });

// LOCAL STORAGE VISIT MESSAGE
const message = document.querySelector('#visit-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (message) {
  if (lastVisit) {
    const days = Math.round((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
    message.textContent = `Welcome back! It's been ${days} day(s) since your last visit.`;
  } else {
    message.textContent = "Welcome! This is your first visit.";
  }
  localStorage.setItem('lastVisit', now.toString());
}


