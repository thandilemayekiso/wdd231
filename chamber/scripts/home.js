// home.js

const spotlightContainer = document.getElementById("spotlightContainer");
const weatherSection = document.getElementById("weather");
const apiKey = "0c2bfad03dc4020c162e9c28730cdf45";
const city = 'Mdantsane,ZA';
const weatherDiv = document.getElementById('weather-info');
// Chamber location coordinates for weather API
const chamberLocation = {
  lat: -32.9460,
  lon: 27.7256,
};

// Weather Section - fetch current weather + 3-day forecast from One Call API
async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${chamberLocation.lat}&lon=${chamberLocation.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    const current = data.current;
    document.getElementById("current-temp").innerHTML = 
      `Current Temp: ${current.temp.toFixed(1)}°C - ${current.weather[0].description}`;

    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "<h3>3-Day Forecast</h3><ul>";

    // Next 3 days forecast (skip day 0 which is today)
    data.daily.slice(1, 4).forEach(day => {
      const dayName = new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
      forecastDiv.innerHTML += `
        <li>
          <strong>${dayName}</strong>: ${day.temp.day.toFixed(1)}°C, ${day.weather[0].description}
        </li>
      `;
    });

    forecastDiv.innerHTML += "</ul>";

  } catch (error) {
    weatherSection.innerHTML = `<p>Error loading weather: ${error.message}</p>`;
  }
}

// Spotlight Section - load members from JSON and display 2-3 random gold/silver members
async function loadSpotlights() {
  try {
    const res = await fetch("data/members.json");
    const data = await res.json();

    // Filter gold and silver members
    const filtered = data.members.filter(m => 
      m.membership.toLowerCase() === "gold" || m.membership.toLowerCase() === "silver"
    );

    // Pick 2 or 3 random members to spotlight
    const count = Math.min(3, filtered.length);
    const spotlights = [];
    const tempMembers = [...filtered];

    while (spotlights.length < count && tempMembers.length > 0) {
      const index = Math.floor(Math.random() * tempMembers.length);
      spotlights.push(tempMembers.splice(index, 1)[0]);
    }

    spotlightContainer.innerHTML = ""; // Clear existing

    spotlights.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name} Logo" loading="lazy" />
        <h4>${member.name}</h4>
        <p>${member.address}</p>
        <p>📞 ${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        <p><strong>Membership:</strong> ${member.membership}</p>
      `;
      spotlightContainer.appendChild(card);
    });

  } catch (error) {
    spotlightContainer.innerHTML = `<p>Error loading members: ${error.message}</p>`;
  }
}

// Initialize functions on DOM load
document.addEventListener("DOMContentLoaded", () => {
  getWeather();
  loadSpotlights();
});
