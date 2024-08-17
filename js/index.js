const APP_ID = "192f1c41fca0fffd32130038a486c9c0";
const DEFAULT_VALUE = "--";

const searchInput = document.querySelector("#search-input");
const cityName = document.querySelector(".city-name");
const weatherState = document.querySelector(".weather-state");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");

const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");

searchInput.addEventListener("change", (e) => {
    const city = e.target.value.trim();
    if (!city) {
        // Clear or set default values if no city input
        cityName.innerHTML = DEFAULT_VALUE;
        weatherState.innerHTML = DEFAULT_VALUE;
        weatherIcon.setAttribute('src', '');
        temperature.innerHTML = DEFAULT_VALUE;
        sunrise.innerHTML = DEFAULT_VALUE;
        sunset.innerHTML = DEFAULT_VALUE;
        humidity.innerHTML = DEFAULT_VALUE;
        windSpeed.innerHTML = DEFAULT_VALUE;
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}&units=metric&lang=kr`;

    fetch(url)
        .then(async res => {
            if (!res.ok) {
                throw new Error("City not found or API key is invalid.");
            }
            const data = await res.json();
            console.log("[Weather Data]", data);

            cityName.innerHTML = data.name || DEFAULT_VALUE;
            weatherState.innerHTML = data.weather[0]?.description || DEFAULT_VALUE;
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`);
            temperature.innerHTML = Math.round(data.main?.temp) || DEFAULT_VALUE;

            // Make sure moment.js is loaded if you're using it
            if (window.moment) {
                sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
                sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
            } else {
                sunrise.innerHTML = DEFAULT_VALUE;
                sunset.innerHTML = DEFAULT_VALUE;
            }

            humidity.innerHTML = data.main?.humidity || DEFAULT_VALUE;
            windSpeed.innerHTML = (data.wind?.speed * 3.6).toFixed(2) || DEFAULT_VALUE;
        })
        .catch(error => {
            console.error("[Fetch Error]", error.message);
            // Clear or set default values if there is an error
            cityName.innerHTML = DEFAULT_VALUE;
            weatherState.innerHTML = DEFAULT_VALUE;
            weatherIcon.setAttribute('src', '');
            temperature.innerHTML = DEFAULT_VALUE;
            sunrise.innerHTML = DEFAULT_VALUE;
            sunset.innerHTML = DEFAULT_VALUE;
            humidity.innerHTML = DEFAULT_VALUE;
            windSpeed.innerHTML = DEFAULT_VALUE;
        });
});


// const APP_ID = "192f1c41fca0fffd32130038a486c9c0";
// const DEFAULT_VALUE = "--";
// const searchInput = document.querySelector("#search-input");
// const cityName = document.querySelector(".city-name");
// const weatherState = document.querySelector(".weather-state");
// const weatherIcon = document.querySelector(".weather-icon");
// const temperature = document.querySelector(".temperature");

// const sunrise = document.querySelector(".sunrise");
// const sunset = document.querySelector(".sunset");
// const humidity = document.querySelector(".humidity");
// // const humidity = document.querySelector(".humidity");
// const windSpeed = document.querySelector(".wind-speed");

// searchInput.addEventListener("change", (e) => {
//      console.log("[Search Input]", e);
//      fetch("https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}")
//            .then(async res => {
//              const data = await res.json();
//              console.log("[Search Input]", data);
//              cityName.innerHTML = data.name || DEFAULT_VALUE;
//              weatherState.innerHTML = data.weather[0]?.description || DEFAULT_VALUE;
//              weatherIcon.setAttribute('src', http://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png);
//              temperature.innerHTML = Math.round(data.main?.temp) || DEFAULT_VALUE;
             
//              sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
//              sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
//              humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
//              windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE;
//            });
// });