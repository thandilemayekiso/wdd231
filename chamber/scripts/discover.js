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
        card.classList.add('discover-card');
        card.innerHTML = `
          <h2>${point.title}</h2>
          <figure>
            <img src="${point.image}" alt="${point.title}" width="300" height="200">
          </figure>
          <address>${point.address}</address>
          <p>${point.description}</p>
          <button onclick="location.href='${point.link}'">Learn More</button>
        `;
        container.appendChild(card);
      });
    }
    console.error('Error loading discover content:', error);
    if (container) {
      container.innerHTML = "<p>Failed to load discover content.</p>";
    }
  });
const message = document.querySelector('#visit-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (message) {
  if (lastVisit) {
    const days = Math.round((now - lastVisit) / (1000 * 60 * 60 * 24));
    message.textContent = `Welcome back! It's been ${days} day(s) since your last visit.`;
  } else {
    message.textContent = "Welcome! This is your first visit.";
  }
localStorage.setItem('lastVisit', now);
}
localStorage.setItem('lastVisit', now);

