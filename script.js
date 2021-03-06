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

  ///////

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML =
            forecastHTML + 
            `
            <div class="col-2">
            <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
            <img
            src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
            alt=""
            width="42"
            />
            <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}?? </span>
            <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}?? </span>
            </div>
            </div>
            `;
        }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "57a16d31a99c50513998174551722349"
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}


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
    
      getForecast(response.data.coord);
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
