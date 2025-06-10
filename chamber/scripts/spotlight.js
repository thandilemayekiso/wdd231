// Fetch and display spotlight members (Gold or Silver)
fetch('data/members.json')
  .then(response => response.json())
  .then(data => {
    const members = data.members.filter(member =>
      member.membership === 'Gold' || member.membership === 'Silver'
    );

    const spotlights = [];
    while (spotlights.length < 3 && members.length > 0) {
      const index = Math.floor(Math.random() * members.length);
      spotlights.push(members.splice(index, 1)[0]);
    }

    const spotlightContainer = document.getElementById('spotlights');
    if (spotlightContainer) {
      spotlights.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');
        card.innerHTML = `
          <img src="${member.image || 'images/default.png'}" alt="${member.name || 'No Name'} Logo" loading="lazy">
          <h4>${member.name || 'No Name'}</h4>
          <p>${member.address || 'No Address Provided'}</p>
          <p>${member.phone || 'No Phone Provided'}</p>
          <a href="${member.website || '#'}" target="_blank" rel="noopener">Visit Website</a>
          <p>Membership Level: ${member.membership || 'N/A'}</p>
        `;
        spotlightContainer.appendChild(card);
      });
    } else {
      console.error('Spotlights container not found in the DOM.');
    }
  })
  .catch(error => {
    console.error('Error loading member data:', error);
  });
