import "./assets/styles/main.css";
import "./assets/styles/media.css";
import "./modules/slider.js";
import "swiper/swiper-bundle.min.css";
import { hourForecast } from "./modules/hourForecast.js";
import { dayForecast } from "./modules/daysForecast.js";
import { apikey } from "./modules/apiKey.js";
import { getDate, getTime } from "./modules/date.js";

let inputCity = document.querySelector(".input-city-class");
let sendButton = document.querySelector(".search-city");
let exactData = document.querySelector(".data");
let cityName = document.querySelector(".city");
let mainWeatherIcon = document.querySelector(".main-weather-icon");
let weatherTemperature = document.querySelector(".weather-temperature");
let descriptionWeather = document.querySelector(".description-weather");
let windSpeed = document.querySelector(".wind");
let visibility = document.querySelector(".visibility");
let pressure = document.querySelector(".pressure");
let humidity = document.querySelector(".humidity");

function convertionDegree(degree) {
  return (degree - 273).toFixed(1);
}

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.display = "none";

  const urlDefault =
    `https://api.openweathermap.org/data/2.5/weather?q=London&` +
    `appid=${apikey}`;

  const urlDefaultDaily = `https://api.openweathermap.org/data/2.5/forecast/daily?q=London&cnt=8&appid=${apikey}`;

  fetch(urlDefault)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error: " + res.status);
      }
      return res.json();
    })
    .then((data) => {
      console.log("API call default", data);
      weatherReport(data);
    });

  fetch(urlDefaultDaily)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error: " + res.status);
      }
      return res.json();
    })
    .then((data) => {
      console.log("API call default (daily)", data);
      weatherReportDaily(data);
    });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let longitude = position.coords.longitude;
      let latitude = position.coords.latitude;
      console.log("Широта: " + latitude + ", Довгота: " + longitude);
      const urlCoordinate =
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&` +
        `lon=${longitude}&appid=${apikey}`;

      const urlCoordinateDaily = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=8&appid=${apikey}`;

      fetch(urlCoordinate)
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .then((data) => {
          console.log("API call by coordinates", data);
          weatherReport(data);
        });

      fetch(urlCoordinateDaily)
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .then((data) => {
          console.log("API call by coordinates (daily)", data);
          weatherReportDaily(data);
        });
    });
  }
});

sendButton.onclick = function (event) {
  event.preventDefault();

  const urlSearch =
    `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&` +
    `appid=${apikey}`;

  const urlSearchDaily = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${inputCity.value}&cnt=8&appid=${apikey}`;

  fetch(urlSearch)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error: " + res.status);
      }
      return res.json();
    })
    .then((data) => {
      console.log("API call by city name", data);
      weatherReport(data);
      inputCity.value = "";
    })
    .catch(() => {
      alert(`${inputCity.value}. There is no city with such name!`);
      inputCity.value = "";
    });

  fetch(urlSearchDaily)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error: " + res.status);
      }
      return res.json();
    })
    .then((data) => {
      console.log("API call by city name (daily)", data);
      weatherReportDaily(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

function weatherReport(data) {
  const urlCity =
    `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` +
    `appid=${apikey}`;

  fetch(urlCity)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error: " + res.status);
      }
      return res.json();
    })
    .then((forecast) => {
      console.log("City name", forecast.city);
      hourForecast(forecast, ".hidden-all");
      hourForecast(forecast, ".hidden-container");

      exactData.innerText = `${getDate()}, ${getTime()}`;
      cityName.innerText = `${data.name}, ${data.sys.country}`;
      weatherTemperature.innerText = `${convertionDegree(data.main.temp)} °C`;
      let icon = data.weather[0].icon;
      let iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png";
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

function weatherReportDaily(data) {
  const urlCityDaily = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${data.city.name}&cnt=8&appid=${apikey}`;

  fetch(urlCityDaily)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error: " + res.status);
      }
      return res.json();
    })
    .then((forecast) => {
      console.log("City name", forecast.city);
      dayForecast(forecast, ".hidden-all");
      dayForecast(forecast, ".hidden-container");
    });
}
