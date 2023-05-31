export function dayForecast(forecast, className) {
  let exactDays = document.querySelectorAll(className + " .exact-day");

  for (let i = 0; i < forecast.list.length; i++) {
    if (i < exactDays.length) {
      let exactDay = exactDays[i];
      exactDay.innerText = new Date(forecast.list[i].dt * 1000).toDateString();
    }
    const maxDayTemperature = Math.floor(forecast.list[i].temp.max - 273);
    const minDayTemperature = Math.floor(forecast.list[i].temp.min - 273);
    let exactTemperatureDays = document.querySelectorAll(
      className + " .exact-temperature-day"
    );

    // console.log(`${minDayTemperature} °C / ${maxDayTemperature} °C`);

    if (i < exactTemperatureDays.length) {
      let exactTemperatureDay = exactTemperatureDays[i];
      exactTemperatureDay.innerText = `${minDayTemperature} °C / ${maxDayTemperature} °C`;
    }

    // console.log(forecast.list[i].weather[0].description);

    let weatherIconDays = document.querySelectorAll(
      className + " .weather-icon-day"
    );
    if (i < weatherIconDays.length) {
      let weatherIconDay = weatherIconDays[i];
      let iconDay = forecast.list[i].weather[0].icon;
      let iconUrlDay = "https://openweathermap.org/img/wn/" + iconDay + ".png";
      weatherIconDay.src = iconUrlDay;
    }

    // const timestamp = forecast.list[i].dt;
    // const date = new Date(timestamp * 1000);
    // const year = date.getFullYear();
    // const month = date.getMonth() + 1;
    // const day = date.getDate();
    // const hours = date.getHours();
    // const minutes = date.getMinutes();
    // const seconds = date.getSeconds();
    // const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    // console.log("Date:", formattedDate);
  }
}
