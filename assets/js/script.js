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

      function renderCities() {
        var citiesArray = JSON.parse(localStorage.getItem("Cities", cities));
        if (!row1.children[1]) {
            cityList.setAttribute(
                "style",
                "list-style: none; padding-left: 0; margin-top: 1rem;")
                row1.appendChild(cityListContainer);
                cityListContainer.appendChild(cityList);
              }
              for (var i = 0; i < citiesArray.length; i++) {
                var listCity = document.createElement("button");
                listCity.setAttribute("class", "border border-dark-subtle mt-2 list-button");
                listCity.textContent = citiesArray[i];
                cityList.appendChild(listCity);
            }
        }
    })
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    container.innerHTML = "";
    Promise.all([current(), forecast()]).then(() => list());
  
  });
  
  row1.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches(".list-button")) {
      container.innerHTML = "";
      searchBox.value = element.textContent;
      console.log(searchBox.value);
      current();
      forecast();
    }
  })
  if (JSON.parse(localStorage.getItem("Cities", cities)) !== null) {
    renderCities();
  }
