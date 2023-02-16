var cities = [];

var cityEl = document.getElementById("enter-city");
var searchEl = document.getElementById("search-for-a-city");
var nameEl = document.getElementById("city-name");
var weatherIconEl = document.getElementById("weather-icon");
var currentTempEl = document.getElementById("temperature");
var currentHumidityEl = document.getElementById("humidity");
var currentWindEl = document.getElementById("wind-speed");
var historyEl = document.getElementById("history");
var fiveDayEl = document.getElementById("fiveday-header");
var todayWeatherEl = document.getElementById("today-weather");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

// unique API
var apiKey = "587a2e0813cc0c14c47806016ddd1841";

function getWeather(cityName) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    axios.get(queryURL)
        .then(function (response) {
            const currentDate = new Date(response.data.dt * 1000);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
            let weatherPic = response.data.weather[0].icon;
            currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currentPicEl.setAttribute("alt", response.data.weather[0].description);
            currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
            currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";

searchEl.addEventListener("click", function () {
    const searchTerm = cityEl.value;
    getWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    searchHistory();
            })

function handelSearchFromSubmit(event) {
    event.preventDefault();

    var city = cityEl.Value.trim();
    if(city){
            getWeather("city-name");
            get5Day("city-name");
            cities.unshift({city});
            cityInputEl.value = "";
        } else{
            alert("Please enter a City");
        }
        saveSearch();
        pastSearch(city);
    }

    var saveSearch = function(){
        localStorage.setItem("cities", JSON.stringify(cities));
    };