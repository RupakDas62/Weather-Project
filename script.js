const cityInput = document.querySelector("#city");
const btn = document.querySelector('#search');
const modeBtn = document.querySelector("#mode");

const image = document.querySelector("#image");
const actualTemp = document.querySelector(".actual-temp");
const feelsLike = document.querySelector(".feels-like");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity-amount-span");
const windSpeed = document.querySelector("#wind-speed-amount-span");
const minTemp = document.querySelector("#min-temp-amount-span");
const maxTemp = document.querySelector("#max-temp-amount-span");

const locationNotFound = document.querySelector(".location-not-found");

image.src = "./assets/Default Weather.webp";

modeBtn.addEventListener('click', function() {
    const bodyBackgroundColor = window.getComputedStyle(document.body).backgroundColor;

    if (bodyBackgroundColor === 'rgb(0, 0, 0)') {
        document.body.style.backgroundColor = "#ffffff"; 
        document.body.style.color = "#000000";
    } else {
        document.body.style.backgroundColor = "#000000"; 
        document.body.style.color = "#ffffff";
    }
});

// image.src = "/assets/error.avif";

btn.addEventListener('click', function() {
    const cityName = cityInput.value;
    // console.log("Button clicked");

async function fetchNote() {
    const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${cityInput.value}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c2bae9db73msh8d7a0c65e9fdaf8p1b1029jsn5ffb8d73fccd',
            'X-RapidAPI-Host': 'weather-api138.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        if(result.cod === `404`) {
            locationNotFound.style.display = "flex";
            actualTemp.innerHTML = `0&degC`;
            feelsLike.innerHTML = "Feels Like : 0&degC";
            description.innerHTML = "Not Found";
            humidity.innerHTML = "0%";
            windSpeed.innerHTML = "0 kmph";
            minTemp.innerHTML = "0&degC";
            maxTemp.innerHTML = "0&degC";
            image.src = "./assets/error.avif";
            console.log("error");
            return;
        }
        locationNotFound.style.display = "none";
        



        // Actual Temperature
        let actualTempCelcius = result.main.temp - 273.15;
        actualTemp.innerHTML = `${Math.floor(actualTempCelcius)}&degC`;

        // Feels Like Temperature
        let feelsLikeCelcius = result.main.feels_like - 273.15;
        feelsLike.innerHTML = `Feels Like : ${Math.floor(feelsLikeCelcius)}&degC`
        
        // Description
        let descriptionApi = result.weather[0].description;
        description.innerHTML = descriptionApi;

        // Humidity
        let humidityApi = result.main.humidity;
        humidity.innerHTML = humidityApi + "%";

        // Wind Speed
        let windSpeedApi = result.wind.speed;
        windSpeed.innerHTML = windSpeedApi + " kmph";

        // Minimum Temperature
        let minTempApi = result.main.temp_min - 273.15;
        minTemp.innerHTML = `${Math.floor(minTempApi)}&deg`;

        // Maximum Temperature
        let maxTempApi = result.main.temp_min - 273.15;
        maxTemp.innerHTML = `${Math.floor(maxTempApi)}&deg`;


        //  PROCESS IMAGE FROM API RESULT.MAIN
        let imgDescription = result.weather[0].main;
        console.log(imgDescription);

        switch(imgDescription) {
            case 'Clouds' :
                image.src = "./assets/cloud.jpeg";
                break;
            case 'Clear' :
                image.src = "./assets/clear.png";
                break;
            case 'Rain' :
                image.src = "./assets/rain.png";
                break;
            case 'Mist' :
                image.src = "./assets/mist.png";
                break;
            case 'Snow' :
                image.src = "./assets/snow.png";
                break;
            case 'Haze' :
                image.src = "./assets/haze.webp";
                break; 
        }

        
        
    } catch (error) {
        console.error(error);
    }
}

fetchNote();

});