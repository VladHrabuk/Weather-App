export function dayForecast(forecast) {
  let exactDays = document.querySelectorAll(".exact-day");

  for (let i = 8; i < forecast.list.length; i += 8) {
    if (i / 8 - 1 < exactDays.length) {
      let exactDay = exactDays[i / 8 - 1];
      exactDay.innerText = new Date(forecast.list[i].dt * 1000).toDateString();
    }

    const maxDayTemperature = Math.floor(forecast.list[i].main.temp_max - 273);
    const minDayTemperature = Math.floor(forecast.list[i].main.temp_min - 273);
    let exactTemperatureDays = document.querySelectorAll(
      ".exact-temperature-day"
    );

    console.log(`${minDayTemperature} °C / ${maxDayTemperature} °C`);

    if (i / 8 - 1 < exactTemperatureDays.length) {
      let exactTemperatureDay = exactTemperatureDays[i / 8 - 1];
      exactTemperatureDay.innerText = `${minDayTemperature} °C / ${maxDayTemperature} °C`;
    }

    console.log(forecast.list[i].weather[0].description);

    let weatherIconDays = document.querySelectorAll(".weather-icon-day");
    if (i / 8 - 1 < weatherIconDays.length) {
      let weatherIconDay = weatherIconDays[i / 8 - 1];
      let iconDay = forecast.list[i / 8 - 1].weather[0].icon;
      let iconUrlDay =
        "http://api.openweathermap.org/img/w/" + iconDay + ".png";
      weatherIconDay.src = iconUrlDay;
    }
  }
}
