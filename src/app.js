function dateAndTime(timestamp) {
  let currentDate = new Date(timestamp);
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let weekDay = days[currentDate.getDay()];
  let currentMonth = months[currentDate.getMonth()];
  let dayNumber = currentDate.getDate();
  let year = currentDate.getFullYear();
  return `🗓️ ${weekDay} ${dayNumber} ${currentMonth} ${year}, ${hours}:${minutes}`;
}

function showData(response) {
  let cityName = document.querySelector("h1");
  let weatherDescription = document.querySelector("#weather-description");
  let windSpeed = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  cityName.innerHTML = response.data.city;
  weatherDescription.innerHTML = response.data.condition.description;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.temperature.humidity;

  let date = document.querySelector("#date");
  date.innerHTML = dateAndTime(response.data.time * 1000);

  let icon = document.querySelector("#weather-icon");
  icon.setAttribute("src", `${response.data.condition.icon_url}`);
  icon.setAttribute("alt", `${response.data.condition.description}`);

  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  celsiusTemperature = response.data.temperature.current;

  obtainForecast(response.data.city);
}
function find(city) {
  let apiKey = "58e244e95c3e78eb13e0ffotadf7c1b8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showData);
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");
  find(city.value);
}
function findMeNow(position) {
  let apiKey = "58e244e95c3e78eb13e0ffotadf7c1b8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showData);
}

function findMe(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findMeNow);
}
function findDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let dailyForecast = response.data.daily;
  let forecastContent = `<div class="row">`;
  dailyForecast.forEach(function eachDay(object, index) {
    if (index > 0 && index < 6) {
      forecastContent =
        forecastContent +
        ` <div class="col-2 forecast">
            <span class="forecast-day">${findDay(object.time)}</span>
            <img src="${object.condition.icon_url}" alt="${
          object.condition.description
        }" width="15px" />
            <span class="max-temp" id="max-temp">${Math.round(
              object.temperature.maximum
            )}°</span> <span class="min-temp" id="min-temp">${Math.round(
          object.temperature.minimum
        )}°</span>
        </div>`;
    }
  });
  forecastContent = forecastContent + `</div>`;
  forecastElement.innerHTML = forecastContent;
}
function obtainForecast(city) {
  let apiKey = `58e244e95c3e78eb13e0ffotadf7c1b8`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showFarenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(farenheitTemperature);
  celsiusLink.classList.remove("off");
  farenheitLink.classList.add("off");
}
function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
  farenheitLink.classList.remove("off");
  celsiusLink.classList.add("off");
}

let celsiusTemperature = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

find("London");

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let currentLocationBtn = document.querySelector("#current-location");
currentLocationBtn.addEventListener("click", findMe);
