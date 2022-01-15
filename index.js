const input = document.getElementById('locationInput')


input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        weather()
    }
})

function weather() {
    let cityName = input.value
    input.value = ""
    getWeather(cityName);
}
let geocode = {
    reverseGeocode: function(latitude, longitude) {
        var api_key = '54bcb6d76fd34d9788c1af796cdf70a1';
        var api_url = 'https://api.opencagedata.com/geocode/v1/json'

        var request_url = api_url +
            '?' +
            'key=' + api_key +
            '&q=' + encodeURIComponent(latitude + ',' + longitude) +
            '&pretty=1' +
            '&no_annotations=1';
        console.log(request_url);
        // see full list of required and optional parameters:
        // https://opencagedata.com/api#forward

        var request = new XMLHttpRequest();
        request.open('GET', request_url, true);

        request.onload = function() {
            // see full list of possible response codes:
            // https://opencagedata.com/api#codes

            if (request.status === 200) {
                // Success!
                var data = JSON.parse(request.responseText);
                getWeather(data.results[0].components.state); // print the location

            } else if (request.status <= 500) {
                // We reached our target server, but it returned an error

                console.log("unable to geocode! Response code: " + request.status);
                var data = JSON.parse(request.responseText);
                console.log('error msg: ' + data.status.message);
            } else {
                console.log("server error");
            }
        };

        request.onerror = function() {
            // There was a connection error of some sort
            console.log("unable to connect to server");
        };

        request.send(); // make the request
    },
    getLocation: function() {
        function success(data) {
            geocode.reverseGeocode(data.coords.latitude, data.coords.longitude)
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, console.error);
        } else {
            getWeather();
        }

    }
}


function getWeather(city) {
    document.querySelector('h2').innerText = "Weather In " + city;
    console.log(city);
    let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" +
        city + "&units=metric&appid=7cd7e5edcee39b34a02e20f8ab6a10eb"
    fetch(weatherUrl).then((response) => response.json())
        .then((data) => displayWeather(data));
}

function displayWeather(data) {
    console.log(data);
    const { description, icon } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector('.temperature').innerHTML = temp + "°C"
    document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
    document.querySelector('.description').innerHTML = description
    document.querySelector('.humidity').innerHTML = "Humidity: " + humidity
    document.querySelector('.wind').innerHTML = "Wind Speed: " + speed
}
geocode.getLocation();