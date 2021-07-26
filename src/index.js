//Updates Day & Time
let now = new Date();
let time = document.querySelector("#current-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDate = days[now.getDay()];
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();

time.innerHTML = `${currentDate} ${currentHour}:${currentMinutes}`;

//User submission - Display City

function submitCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-city-input");
  //console.log(inputCity.value);

  let searchCity = document.querySelector("#current-city");
  //console.log(searchCity);

  searchCity.innerHTML = `${inputCity.value}`;
  enterCity(`${inputCity.value}`);
}

let submit = document.querySelector("#search-form");
submit.addEventListener("submit", submitCity);

//Default City
enterCity("New York");

//Updates city with user submissions - Weather API

function enterCity(city) {
  //event.preventDefault();
  let apiKey = "5562088dc6a08cb31f02b4a3aba8768d";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  //console.log(temperature);

  let weather = document.querySelector("#current-temp");
  weather.innerHTML = `${temperature}°F`;

  let mainCity = document.querySelector("#current-city");
  mainCity.innerHTML = response.data.name;

  let currentCondition = document.querySelector("#current-condition");
  currentCondition.innerHTML = response.data.weather[0].main;

  let currentWindSpeed = document.querySelector("#wind");
  let windSpeed = response.data.wind.speed;
  currentWindSpeed.innerHTML = `Wind: ${windSpeed} mph`;

  let currentHumidity = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;

  let currentWeatherIcon = document.querySelector("#current-weather-icon");
  currentWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  );
  currentWeatherIcon.setAttribute(
    "alt",
    `${response.data.weather[0].description}`
  );
}

//Geolocation API
function currentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let unit = "imperial";

  let apiKey = "5562088dc6a08cb31f02b4a3aba8768d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}
function currentLocationButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", currentLocationButton);
