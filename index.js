const input = document.getElementById('locationInput')

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        getWeather()
    }
})

function getWeather() {
    let city = input.value
    input.value = ""
    document.querySelector('h2').innerText = "Weather In " + city;

    let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" +
        city + "&units=metric&appid=7cd7e5edcee39b34a02e20f8ab6a10eb"
    console.log(weatherUrl);
    fetch(weatherUrl).then((response) => response.json())
        .then((data) => displayWeather(data));

    const displayWeather = function(data) {
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

}