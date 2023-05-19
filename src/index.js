import { hourForecast } from "./hourForecast.js";
import { dayForecast } from "./daysForecast.js";
const apikey = "51a69699ffd7a56062d563e3a38075dc";

let inputCity = document.querySelector("#input-city");
let sendButton = document.querySelector("#search-city");
let exactData = document.querySelector(".data");
let cityName = document.querySelector(".city");
let mainWeatherIcon = document.querySelector(".main-weather-icon");
let weatherTemperature = document.querySelector(".weather-temperature");
let descriptionWeather = document.querySelector(".description-weather");
let windSpeed = document.querySelector(".wind");
let visibility = document.querySelector(".visibility");
let weatherIconTime = document.querySelector(".weather-icon-time");
let pressure = document.querySelector(".pressure");
let humidity = document.querySelector(".humidity");
let exactTemperature = document.querySelector(".exact-temperature");
let weatherIconDay = document.querySelector(".weather-icon-day");
let exactDay = document.querySelectorAll(".exact-day");
let exactTemperatureDay = document.querySelector(".exact-temperature-day");

function convertionDegree(degree) {
  return (degree - 273).toFixed(1);
}

function getData() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString("en-us", { month: "long" });
  const day = currentDate.getDate();
  return year + " " + day + " " + month;
}

function getTime() {
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.toLocaleString("en-us", { month: "long" });
let day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
let formattedDate = year + " " + day + " " + month;

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let longitude = position.coords.longitude;
      let latitude = position.coords.latitude;
      console.log("Широта: " + latitude + ", Довгота: " + longitude);
      const urlCoordinate =
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&` +
        `lon=${longitude}&appid=${apikey}`;

      fetch(urlCoordinate)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("API call by coordinates", data);
          weatherReport(data);
        });
    });
  }
});

sendButton.onclick = function (event) {
  event.preventDefault();

  const urlSearch =
    `http://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&` +
    `appid=${apikey}`;

  fetch(urlSearch)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("API call by city name", data);
      weatherReport(data);
    });
  inputCity.value = "";
};

function weatherReport(data) {
  const urlCity =
    `http://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` +
    `appid=${apikey}`;

  fetch(urlCity)
    .then((res) => {
      return res.json();
    })
    .then((forecast) => {
      console.log("City name", forecast.city);
      hourForecast(forecast);
      dayForecast(forecast);

      exactData.innerText = `${formattedDate}, ${formattedTime}`;
      cityName.innerText = `${data.name}, ${data.sys.country}`;
      weatherTemperature.innerText = `${convertionDegree(data.main.temp)} °C`;
      let icon = data.weather[0].icon;
      let iconUrl = "http://api.openweathermap.org/img/w/" + icon + ".png";
      mainWeatherIcon.src = iconUrl;

      descriptionWeather.innerText = `Feel like ${convertionDegree(
        data.main.feels_like
      )} °C. ${data.weather[0].main}, ${data.weather[0].description}.`;

      windSpeed.innerText = `${data.wind.speed} m / s`;
      visibility.innerHTML = `Visability is ${data.visibility} meters`;
      pressure.innerText = `Pressure ${data.main.pressure} hPa`;
      humidity.innerText = `Humidity ${data.main.humidity} %`;
    });
}
