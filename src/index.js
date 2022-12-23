let dateTime = document.querySelector("#dateTime");
let now = new Date();

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
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();
dateTime.innerHTML = `${month} ${date}, ${hour}:${minute}`;

let form = document.querySelector("#search-form");

form.addEventListener("submit", handleSubmit);

let searchInput = document.querySelector("#search-city");

function showTemperature(response) {
  let h4 = document.querySelector("h4");
  h4.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${temperature} °C`;
  let description = document.querySelector("p");
  description.innerHTML = response.data.weather[0].main;
}
function search(city) {
  let apiKey = "c651b570409fd5da2a6ffe01cfd48b43";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}
search("Rome");
function searchLocation(position) {
  let apiKey = "c651b570409fd5da2a6ffe01cfd48b43";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
