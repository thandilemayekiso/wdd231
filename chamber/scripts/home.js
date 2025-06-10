// home.js

document.addEventListener("DOMContentLoaded", () => {
  // Toggle navigation menu
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector("nav ul");
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // Load weather data
  const apiKey = "0c2bfad03dc4020c162e9c28730cdf45"; // Replace with your OpenWeatherMap API key
  const city = "Mdantsane";
  const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(weatherURL)
    .then((response) => response.json())
    .then((data) => {
      const current = data.list[0];
      const currentTemp = document.getElementById("current-temp");
      currentTemp.innerHTML = `<strong>Current:</strong> ${current.main.temp.toFixed(1)}°C, ${current.weather[0].description}`;

      const forecastDiv = document.getElementById("forecast");
      forecastDiv.innerHTML = "";

      for (let i = 1; i <= 3; i++) {
        const forecast = data.list[i * 8];
        const day = new Date(forecast.dt_txt).toLocaleDateString("en-ZA", {
          weekday: "long",
        });
        forecastDiv.innerHTML += `<div><strong>${day}:</strong> ${forecast.main.temp.toFixed(1)}°C</div>`;
      }
    })
    .catch((error) => {
      document.getElementById("current-temp").textContent = "Weather unavailable";
      console.error("Weather fetch error:", error);
    });

  // Load spotlight members
  fetch("data/members.json")
    .then((response) => response.json())
    .then((data) => {
      const spotlightContainer = document.getElementById("spotlightContainer");
      const goldSilver = data.members.filter((m) =>
        ["Gold", "Silver"].includes(m.membershipLevel)
      );

      const randomMembers = [];
      while (randomMembers.length < 3 && goldSilver.length > 0) {
        const index = Math.floor(Math.random() * goldSilver.length);
        randomMembers.push(goldSilver.splice(index, 1)[0]);
      }

      spotlightContainer.innerHTML = randomMembers
        .map((member) => {
          return `
          <div class="spotlight-card">
            <img src="${member.logo}" alt="${member.name} Logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <span class="badge ${member.membershipLevel.toLowerCase()}">${member.membershipLevel}</span>
          </div>`;
        })
        .join("");
    })
    .catch((error) => {
      console.error("Error loading member spotlights:", error);
    });
});

