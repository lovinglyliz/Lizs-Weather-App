let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentDate = now.getDate();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let localTime = document.querySelector(".local-time");
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
} else {
  localTime.innerHTML = `${currentHour}:${currentMinutes}`;
}

let localDate = document.querySelector(".current-day");
localDate.innerHTML = `${currentDay} | ${currentMonth} ${currentDate} | ${currentHour}:${currentMinutes}`;

function showCity(event) {
  event.preventDefault();
  let displayedCity = document.querySelector(".current-city");
  let searchInput = document.querySelector("#city-input");
  if (searchInput.value) {
    displayedCity.innerHTML = `${searchInput.value}`;
  } else {
    displayedCity.innerHTML = `Please enter a city`;
  }
  let apiKey = "094d437fa94d2bd064eaef1d3448a9ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search-city-form");
form.addEventListener("submit", showCity);

function showTemperature(response) {
  console.log(response.data);
  let currentTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = `${currentTemp}`;
  let tempMin = document.querySelector("#todays-min");
  let todaysMin = Math.round(response.data.main.temp_min);
  tempMin.innerHTML = `L:${todaysMin}°C`;
  let tempMax = document.querySelector("#todays-max");
  let todaysMax = Math.round(response.data.main.temp_max);
  tempMax.innerHTML = `H:${todaysMax} °C |`;
  let windspeed = document.querySelector("#todays-wind");
  let todaysWind = Math.round(response.data.wind.speed);
  windspeed.innerHTML = `Wind:${todaysWind} km/h`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let displayCity = document.querySelector(".current-city");
  displayCity.innerHTML = response.data.name;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}10d@2x.png`
  );
}

function showCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8094d437fa94d2bd064eaef1d3448a9ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentPosition = document.querySelector("#current-location");
currentPosition.addEventListener("click", getPosition);

//convert temperature

//convert temperature

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = 85;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = 29;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
