const apiKey = "0c2bfad03dc4020c162e9c28730cdf45";
const lat = -32.9323;
const lon = 27.7426;

async function getWeather() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`);
    if (!response.ok) throw new Error("Weather fetch failed");
    const data = await response.json();

    document.getElementById("current-temp").innerText =
      `Current Temp: ${data.current.temp.toFixed(1)}°C - ${data.current.weather[0].description}`;

    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "<h3>3-Day Forecast</h3><ul>";
    data.daily.slice(1, 4).forEach(day => {
      const date = new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
      forecastDiv.innerHTML += `<li>${date}: ${day.temp.day.toFixed(1)}°C - ${day.weather[0].description}</li>`;
    });
    forecastDiv.innerHTML += "</ul>";
  } catch (error) {
    document.getElementById("weather").innerHTML = `<p>Error loading weather: ${error.message}</p>`;
  }
}

getWeather();

