export function hourForecast(forecast, className) {
  // console.log(forecast.list);
  for (let i = 0; i < 5; i++) {
    let date = new Date(forecast.list[i].dt * 1000);
    // console.log("Upcoming time", date.toLocaleTimeString().replace(":00", ""));
    let exactTimes = document.querySelectorAll(className + " .exact-time");
    if (i < exactTimes.length) {
      let exactTime = exactTimes[i];
      exactTime.innerText = date.toLocaleTimeString().replace(":00", "");
    }
    // console.log("Максимальна t", forecast.list[i].main.temp_max - 273);
    let exactTemperatures = document.querySelectorAll(
      className + " .exact-temperature"
    );
    const maxHourTemperature = Math.floor(forecast.list[i].main.temp_max - 273);
    const minHourTempurature = Math.floor(forecast.list[i].main.temp_min - 273);

    if (i < exactTemperatures.length) {
      let exactTemperature = exactTemperatures[i];
      exactTemperature.innerText = `${minHourTempurature} °C / ${maxHourTemperature} °C`;
    }
    let weatherDescriptionTimes = document.querySelectorAll(
      className + " .time-description"
    );
    let description = forecast.list[i].weather[0].description;
    // console.log("Опис", forecast.list[i].weather[0].description);

    if (i < weatherDescriptionTimes.length) {
      let weatherDescriptionTime = weatherDescriptionTimes[i];
      weatherDescriptionTime.innerText =
        description.charAt(0).toUpperCase() + description.slice(1);
    }

    let weatherIconTimes = document.querySelectorAll(
      className + " .weather-icon-time"
    );
    // console.log("Іконка", forecast.list[i].weather[0].icon);
    if (i < weatherIconTimes.length) {
      let weatherIconTime = weatherIconTimes[i];
      let iconTime = forecast.list[i].weather[0].icon;
      let iconUrlTime =
        "https://openweathermap.org/img/wn/" + iconTime + ".png";
      weatherIconTime.src = iconUrlTime;
    }
  }
}
