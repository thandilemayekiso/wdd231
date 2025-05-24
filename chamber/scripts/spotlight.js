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
    spotlights.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('spotlight-card');
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name} Logo">
        <h4>${member.name}</h4>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p>Membership Level: ${member.membership}</p>
      `;
      spotlightContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error loading member data:', error);
  });
