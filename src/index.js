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

//Display Future Forecast
function displayForecast(response) {

  console.log(response.data);
  let forecastElement = document.querySelector("#weather-forecast");
  
  let forecastHTML = `<div class="row">`;
  let days = [
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thurs",
  "Fri",
]
days.forEach(function(days){
  forecastHTML = forecastHTML +
`
    <div class="col-2">
      <h3 class="days">${days}</h3>
        <img class="week-weather" id="future-weather-icon" src="http://openweathermap.org/img/wn/50d@2x.png" />
        <div class="forecast-temperature">
          <span class="forecast-temperature-max">65°F</span>  <span class="forecast-temperature-min">40°F</span>
        </div>
    </div>
`
})


forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML

}

//Get Long & Lat of Searched City
function getFutureForecast(coordinates) {
  // console.log(coordinates);
  let apiKey = "5562088dc6a08cb31f02b4a3aba8768d";
  let unit = "imperial";
  let apiURL =`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${unit}&appid=${apiKey}`

  axios.get(apiUrl).then(displayForecast);
}

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
  // console.log(response);
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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentWeatherIcon.setAttribute(
    "alt",
    `${response.data.weather[0].description}`
  );

  // displayForecast();

  getFutureForecast(response.data.coord)
  console.log(getFutureForecast)
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
