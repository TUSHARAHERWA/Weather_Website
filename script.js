let button = document.querySelector(".btn");
let inpTxt = document.querySelector(".inputText");
let temperature = document.querySelector(".temperature");
let cityName = document.querySelector(".cityName");
let minTemperature = document.querySelector(".minTemperature");
let maxTemperature = document.querySelector(".maxTemperature");
let forecast = document.querySelector(".forecast");
let weatherImage = document.querySelector(".weatherImage");
let OnSubmit = document.querySelector(".OnSubmit");
let pressure = document.querySelector(".pressure");
let humidity = document.querySelector(".humidity");
let feelsLike = document.querySelector(".feelsLike");
let windSpeed = document.querySelector(".windSpeed");
let sunrise = document.querySelector(".sunrise");
let sunset = document.querySelector(".sunset");
let city = "Mumbai";
button.addEventListener("click", () => {
  if (inpTxt.value == "") {
    alert("Enter a city name");
  }

  city = inpTxt.value;
  fetchData();
});
OnSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
});
async function fetchData() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID={YOUR API KEY HERE}`;
  let res = await fetch(apiUrl);
  let data = await res.json();
  if (data.cod == "404") {
    alert("Please enter a valid city name");
  }
  const { name, main, weather, sys, dt, wind } = data;

  temperature.innerHTML = Math.round(main.temp - 273.15) + "&degC";
  function getCountry(city) {
    let value = new Intl.DisplayNames([city], { type: "region" }).of(city);
    return value.toUpperCase();
  }
  cityName.innerHTML = `${city.toUpperCase()}, ${getCountry(sys.country)}`;

  minTemperature.innerHTML = `Min  ${
    Math.round(main.temp_min - 273.15) + "&degC"
  }`;
  maxTemperature.innerHTML = `Max  ${
    Math.round(main.temp_max - 273.15) + "&degC"
  }`;
  forecast.innerHTML = weather[0].main;

  weatherImage.innerHTML = `<img src = "https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt = "Unable to load image"/>`;
  pressure.innerHTML = main.pressure + "&deg";
  humidity.innerHTML = main.humidity + "&deg";
  feelsLike.innerHTML = main.feels_like + "&deg";
  windSpeed.innerHTML = wind.speed + "&deg";
  sunrise.innerHTML = sys.sunrise + "&deg";
  sunset.innerHTML = sys.sunset + "&deg";
}
fetchData();
