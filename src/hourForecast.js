export function hourForecast(forecast) {
  console.log(forecast.list);
  for (let i = 0; i < 5; i++) {
    let date = new Date(forecast.list[i].dt * 1000);
    console.log(date.toLocaleTimeString().replace(":00", ""));
    let exactTimes = document.querySelectorAll(".exact-time");
    if (i < exactTimes.length) {
      let exactTime = exactTimes[i];
      exactTime.innerText = date.toLocaleTimeString().replace(":00", "");
    }
    console.log(forecast.list[i].main.temp_max - 273);
    let exactTemperatures = document.querySelectorAll(".exact-temperature");
    const maxHourTemperature = Math.floor(forecast.list[i].main.temp_max - 273);
    const minHourTempurature = Math.floor(forecast.list[i].main.temp_min - 273);
    console.log(forecast.list[i].weather[0].description);
    console.log(forecast.list[i].weather[0].icon);

    if (i < exactTemperatures.length) {
      let exactTemperature = exactTemperatures[i];
      exactTemperature.innerText = `${minHourTempurature} °C / ${maxHourTemperature} °C`;
    }

    let weatherIconTimes = document.querySelectorAll(".weather-icon-time");
    if (i < weatherIconTimes.length) {
      let weatherIconTime = weatherIconTimes[i];
      let iconTime = forecast.list[i].weather[0].icon;
      let iconUrlTime =
        "http://api.openweathermap.org/img/w/" + iconTime + ".png";
      weatherIconTime.src = iconUrlTime;
    }
  }
}
