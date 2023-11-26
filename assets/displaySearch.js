var weatherContainer = document.querySelector('.weather');
var apiKey = "a4bf9990bcf9632efd2074e14211ea95";
var liveCardEl = document.querySelector('#live-card');

function toFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9 / 5) + 32;
}

function getApi() {
    var city = document.getElementById('search-bar').value;

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var lat = data.coord.lat;
            var lon = data.coord.lon;

            searchApi(lat, lon);
        });
}

function searchApi(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Clear existing weather content
            weatherContainer.innerHTML = '';

            var city = document.createElement('h1')
            city.textContent = 'City: ' + data.city.name
            weatherContainer.append(city);

            for (let index = 0; index < data.list.length; index += 8) {

                var weather = document.createElement('h2');
                var date = document.createElement('div');
                // var tempFahrenheit = toFahrenheit(data.list[index].main.temp);
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

submitEl.addEventListener('click', searchDivSubmit);















