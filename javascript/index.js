//Feature 1
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth = months[date.getMonth()];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${currentDay}, ${currentMonth} ${date.getDate()}, ${hours}:${minutes}`;
}

let now = new Date();
let h2 = document.querySelector("h2");
h2.innerHTML = formatDate(now);

//Feature 3

function getWeather(response) {
  let temperature = Math.round(response.data.main.temp);

  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${temperature}°F`;

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = response.data.main.feels_like;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let pressure = document.querySelector("#wind-speed");
  pressure.innerHTML = response.data.wind.speed;
}

function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city");
  let searchedCity = city.value;

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = searchedCity + " <br /> 😄";

  let units = `imperial`;
  let apiKey = `b190b9864cf7bf2f14432317f03ad0e6`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(getWeather);
}

function gpsWeather(response) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name + "<br /> 😼";

  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${temperature}°F`;

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let pressure = document.querySelector("#wind-speed");
  pressure.innerHTML = response.data.wind.speed;
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let units = `imperial`;
  let apiKey = `b190b9864cf7bf2f14432317f03ad0e6`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(gpsWeather);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getPosition);

let weatherForm = document.querySelector("#search-form");
weatherForm.addEventListener("submit", getCity);
