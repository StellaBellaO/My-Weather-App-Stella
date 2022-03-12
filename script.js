//time
let now = new Date();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = weekDays[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = document.querySelector(".time");

time.innerHTML = `${day} <br> ${hour}:${minutes}`;

/// convert c to f
function convertToFahrenheit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");

  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");

  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");

fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");

celsiusLink.addEventListener("click", convertToCelsius);

/// city

function showWeather(response) {
  console.log(response);
  document.querySelector(".location").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  let description = document.querySelector(".weather");
  description.innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "57a16d31a99c50513998174551722349";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#find-input").value;
  searchCity(city);
}

let form = document.querySelector("#button-input");
form.addEventListener("submit", submit);

///

function searchLocation(position) {
  let apikey = "57a16d31a99c50513998174551722349";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apikey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#get-location");
currentLocationButton.addEventListener("click", getCurrentLocation);
