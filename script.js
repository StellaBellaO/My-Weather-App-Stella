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

//// City Search
function showWeather(response) {
    document.querySelector(".location").innerHTML = response.data.name;
    document.querySelector(".temperature").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector(".humidity").innerHTML = response.data.main.humidity;
    document.querySelector(".wind").innerHTML = Math.round(response.data.wind.speed);
  
    document.querySelector(".weather").innerHTML = response.data.weather[0].main;
    celsiusTemperature = response.data.main.temp;
    
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      iconElement.setAttribute("alt", response.data.weather[0].description);
  }
  
  function search(city) {
    let apiKey = "57a16d31a99c50513998174551722349";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function submit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#find-input");
    search(cityInputElement.value);
  }
  
  let form = document.querySelector("#button-input");
  form.addEventListener("submit", submit);
  
/// convert c to f
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);


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

search("Bahamas");
