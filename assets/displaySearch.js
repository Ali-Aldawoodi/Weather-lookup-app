var weatherContainer = document.querySelector('.weather');
var liveContainer = document.querySelector('.live-weather')
var apiKey = "a4bf9990bcf9632efd2074e14211ea95";
var liveCardEl = document.querySelector('#live-card');

function toFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9 / 5) + 32;
}

function getApi() {
    var city = document.getElementById('search-bar').value;

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var lat = data.coord.lat;
            var lon = data.coord.lon;

            searchApi(lat, lon);

            liveContainer.innerHTML = '';

            const unixTimestamp = data.dt; 

            const dateObject = new Date(unixTimestamp * 1000);
            
            const formattedDate = `${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')}/${dateObject.getFullYear()}`;

            var currentDay = document.createElement('h1');
            currentDay.textContent = 'Current Forecast: ';
            liveContainer.append(currentDay);

            var city = document.createElement('h2');
            city.textContent = 'City: ' + data.name;
            liveContainer.append(city);


                var weather = document.createElement('h2');
                var date = document.createElement('div');
                var humidity = document.createElement('div');
                var windSpeed = document.createElement('div');


                weather.textContent = 'Temperature: ' + data.main.temp + ' °F';
                date.textContent = 'Date: ' + formattedDate;
                humidity.textContent = 'Humidity: ' + data.main.humidity;
                windSpeed.textContent = 'Wind Speed: ' + data.wind.speed + ' mph';


                liveContainer.append(weather);
                liveContainer.append(date);
                liveContainer.append(humidity);
                liveContainer.append(windSpeed)
        });
}

function searchApi(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            weatherContainer.innerHTML = '';

            var fiveDay = document.createElement('h1');
            fiveDay.textContent = '5 Day Forecast: ';
            fiveDay.classList.add('bg-dark')
            weatherContainer.append(fiveDay);

            var city = document.createElement('h2')
            city.textContent = 'City: ' + data.city.name
            weatherContainer.append(city);

            for (let index = 1; index < data.list.length; index += 8) {

                var weather = document.createElement('h2');
                var date = document.createElement('div');
                var humidity = document.createElement('div');
                var windSpeed = document.createElement('div');


                weather.textContent = 'Temperature: ' + data.list[index].main.temp + ' °F';
                date.textContent = 'Date: ' + data.list[index].dt_txt;
                humidity.textContent = 'Humidity: ' + data.list[index].main.humidity;
                windSpeed.textContent = 'Wind Speed: ' + data.list[index].wind.speed + ' mph';


                weatherContainer.append(weather);
                weatherContainer.append(date);
                weatherContainer.append(humidity);
                weatherContainer.append(windSpeed);
            }
        });
}


var submitEl = document.querySelector('#submit');

function searchDivSubmit(event) {
    event.preventDefault();
    getApi();
}

submitEl.addEventListener('click', function(event) {
    searchDivSubmit(event)
 
    var storedWeather = {
    weather: weather.value,
    date: date.value,
    humidity: humidity.value,
    windSpeed: wind.speed.value,
};

localStorage.setItem("storedWeather", JSON.stringify(storedWeather));
renderWeather();
});

function renderWeather(){
    var lastWeather = JSON.parse(localStorage.getItem("storedWeather"));
    console.log("Last Weather: ", lastWeather);
};




