const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
const lat = -32.9460;
const lon = 27.7256;
const weatherContainer = document.getElementById('weather');

fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const current = data.current;
    const daily = data.daily.slice(1, 4); // Next 3 days

    weatherContainer.innerHTML = `
      <h3>Current Weather</h3>
      <p>Temperature: ${current.temp}°C</p>
      <p>Conditions: ${current.weather[0].description}</p>
      <h3>3-Day Forecast</h3>
      <ul>
        ${daily.map(day => `
          <li>
            <strong>${new Date(day.dt * 1000).toLocaleDateString()}</strong>: 
            ${day.temp.day}°C, ${day.weather[0].description}
          </li>
        `).join('')}
      </ul>
    `;
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
    weatherContainer.innerHTML = '<p>Unable to load weather data at this time.</p>';
  });
