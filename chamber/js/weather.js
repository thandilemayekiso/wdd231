const apiKey = "0c2bfad03dc4020c162e9c28730cdf45";  // Replace with your key
const lat = -32.9323; // Mdantsane latitude
const lon = 27.7426;  // Mdantsane longitude

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch weather data");
    
    const data = await response.json();
    
    document.getElementById("current-temp").textContent =
      `Current Temp: ${data.current.temp.toFixed(1)}°C - ${data.current.weather[0].description}`;
    
    const forecastEl = document.getElementById("forecast");
    let forecastHTML = "<h3>3-Day Forecast</h3><ul>";
    data.daily.slice(1, 4).forEach(day => {
      const weekday = new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
      forecastHTML += `<li>${weekday}: ${day.temp.day.toFixed(1)}°C - ${day.weather[0].description}</li>`;
    });
    forecastHTML += "</ul>";
    forecastEl.innerHTML = forecastHTML;

  } catch (error) {
    document.getElementById("weather").innerHTML = `<p>Error loading weather: ${error.message}</p>`;
  }
}

getWeather();
