function backgroundImage(hours) {
  let body = document.querySelector("body");
  if (hours < 7 || hours > 18) {
    body.style.backgroundImage =
      "url(https://s3.amazonaws.com/shecodesio-production/uploads/files/000/069/097/original/pexels-ken-cheung-5574638.jpg?1677347647)";
  } else {
    body.style.backgroundImage =
      "url(https://s3.amazonaws.com/shecodesio-production/uploads/files/000/069/098/original/pexels-jess-loiterton-4321802.jpg?1677347668)";
  }
}
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
  backgroundImage(hours);
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
    let maxTemp = `${Math.round(object.temperature.maximum)}°C`;
    let minTemp = `${Math.round(object.temperature.minimum)}°C`;
    if (index > 0 && index < 6) {
      forecastContent =
        forecastContent +
        ` <div class="col-2 forecast">
            <span class="forecast-day">${findDay(object.time)}</span>
            <img src="${object.condition.icon_url}" alt="${
          object.condition.description
        }"  class="rounded mx-auto d-block forecast-pictures" />
            <span class="max-temp" >${maxTemp}</span> <span class="min-temp" >${minTemp}</span>
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

find("London");

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let currentLocationBtn = document.querySelector("#current-location");
currentLocationBtn.addEventListener("click", findMe);
