// Weather App Project

// A simple weather app that allows users to check the weather of a city. Designed with HTML, CSS, and JavaScript.

const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apikey = "06a26fe4de133d8b3ca763176b9ad52b";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("City field cannot be empty");
    }
});

async function getWeatherData(city){ // Async kullanarak önce veriyi aldıktan sonra mı function çalışsın demek istedik? = Evet
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("City not found");
    }

    return await response.json();

}

function displayWeatherInfo(data){
    const {name: city,
           main: {temp, humidity},
           weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "block";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("img");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    if(weatherId >= 200 && weatherId <= 300){
        return "⛈️";
    }
    else if(weatherId >= 300 && weatherId <= 400){
        return "🌧️";
    }
    else if(weatherId >= 500 && weatherId <= 600){
        return "🌧️";
    }
    else if(weatherId >= 600 && weatherId <= 700){
        return "❄️";
    }
    else if(weatherId >= 700 && weatherId <= 800){
        return "🌫️";
    }
    else if(weatherId === 800){
        return "☀️";
    }
    else if(weatherId >= 801 && weatherId <= 810){
        return "☁️";
    }
    else{
        return "🤷";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "block";
    card.appendChild(errorDisplay);
}