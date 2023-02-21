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
}
let city = "New York";
let apiKey = "58e244e95c3e78eb13e0ffotadf7c1b8";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(showData);
