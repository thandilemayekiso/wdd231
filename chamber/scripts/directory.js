// home.js

document.addEventListener("DOMContentLoaded", () => {
  // Toggle navigation menu
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector("nav ul");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  // Load weather data for home page
  const weatherHome = document.getElementById("current-temp");
  const forecastDiv = document.getElementById("forecast");
  if (weatherHome && forecastDiv) {
    const apiKey = "0c2bfad03dc4020c162e9c28730cdf45"; // Replace with your OpenWeatherMap API key
    const city = "Mdantsane";
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(weatherURL)
      .then((response) => response.json())
      .then((data) => {
        const current = data.list[0];
        weatherHome.innerHTML = `<strong>Current:</strong> ${current.main.temp.toFixed(1)}°C, ${current.weather[0].description}`;

        forecastDiv.innerHTML = "";
        for (let i = 1; i <= 3; i++) {
          const forecast = data.list[i * 8];
          const day = new Date(forecast.dt_txt).toLocaleDateString("en-ZA", { weekday: "long" });
          forecastDiv.innerHTML += `<div><strong>${day}:</strong> ${forecast.main.temp.toFixed(1)}°C</div>`;
        }
      })
      .catch((error) => {
        weatherHome.textContent = "Weather unavailable";
        console.error("Weather fetch error:", error);
      });
  }

  // Load spotlight members
  const spotlightContainer = document.getElementById("spotlightContainer");
  if (spotlightContainer) {
    fetch("data/members.json")
      .then((response) => response.json())
      .then((data) => {
        const goldSilver = data.members.filter((m) => ["Gold", "Silver"].includes(m.membershipLevel));
        const randomMembers = [];

        while (randomMembers.length < 3 && goldSilver.length > 0) {
          const index = Math.floor(Math.random() * goldSilver.length);
          randomMembers.push(goldSilver.splice(index, 1)[0]);
        }

        spotlightContainer.innerHTML = randomMembers
          .map((member) => `
            <div class="spotlight-card">
              <img src="${member.logo}" alt="${member.name} Logo">
              <h3>${member.name}</h3>
              <p>${member.address}</p>
              <p>${member.phone}</p>
              <a href="${member.website}" target="_blank">Visit Website</a>
              <span class="badge ${member.membershipLevel.toLowerCase()}">${member.membershipLevel}</span>
            </div>
          `)
          .join("");
      })
      .catch((error) => {
        console.error("Error loading member spotlights:", error);
      });
  }

  // Directory page logic
  const directoryContainer = document.getElementById("directory");
  const gridBtn = document.getElementById("gridBtn");
  const listBtn = document.getElementById("listBtn");

  async function getMembers() {
    try {
      const response = await fetch("data/members.json");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      displayMembers(data.members);
    } catch (error) {
      if (directoryContainer) {
        directoryContainer.innerHTML = `<p>Error loading members: ${error.message}</p>`;
      }
    }
  }

  function displayMembers(members) {
    if (!directoryContainer) return;
    directoryContainer.innerHTML = "";
    members.forEach((member) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy">
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><a href="${member.website}" target="_blank">Visit Website</a></p>
      `;
      directoryContainer.appendChild(card);
    });
  }

  if (gridBtn && directoryContainer) {
    gridBtn.addEventListener("click", () => {
      directoryContainer.classList.add("grid");
      directoryContainer.classList.remove("list");
    });
  }

  if (listBtn && directoryContainer) {
    listBtn.addEventListener("click", () => {
      directoryContainer.classList.add("list");
      directoryContainer.classList.remove("grid");
    });
  }

  // Footer date and last modified
  const yearElem = document.getElementById("year");
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
  const lastModifiedElem = document.getElementById("lastModified");
  if (lastModifiedElem) {
    lastModifiedElem.textContent = document.lastModified;
  }

  getMembers();

  // Mobile navigation menu button
  const menuBtn = document.getElementById("menuBtn");
  const navList = document.getElementById("navList");
  if (menuBtn && navList) {
    menuBtn.addEventListener("click", () => {
      navList.classList.toggle("show");
    });
  }

  const closeBtn = document.getElementById("closeBtn");
  if (closeBtn && navList) {
    closeBtn.addEventListener("click", () => {
      navList.classList.remove("show");
    });
  }
});
    
