var weatherContainer = document.querySelector('.weather');
    var apiKey = "a4bf9990bcf9632efd2074e14211ea95";
    var liveCardEl = document.querySelector('#live-card');

    function toFahrenheit(kelvin) {
        return ((kelvin - 273.15) * 9/5) + 32;
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
      fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          // Clear existing weather content
          weatherContainer.innerHTML = '';

          for (let index = 0; index < data.list.length; index+=8) {
            var weather = document.createElement('h3');
            var tempFahrenheit = toFahrenheit(data.list[index].main.temp);

            weather.textContent = tempFahrenheit.toFixed(2) + '°F';
            weatherContainer.append(weather);
          }
        });
    }

    // function displayCards(displayedObj) {
    //   console.log(displayedObj);

    //   var liveForecard = document.createElement('div');
    //   liveForecard.classList.add('card', 'test-dark');

    //   var liveForecardBody = document.createElement('div');
    //   liveForecardBody.classList.add('card-body');
    //   liveForecard.append(liveForecardBody);

    //   var cardTitle = document.createElement('h3');
    //   cardTitle.textContent = displayedObj.cardTitle;

    //   liveForecard.append(cardTitle);
    //   liveCardEl.append(liveForecard);
    // }

    var submitEl = document.querySelector('#submit');

    function searchDivSubmit(event) {
      event.preventDefault();
      getApi();
    }

    submitEl.addEventListener('click', searchDivSubmit);















