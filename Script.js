const apiKey = "7a1b8387cd362971637e7f56e499e246";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error");
const weatherInfo = document.querySelector(".weather");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status === 404) {
            // Show error message and hide weather info
            errorMessage.style.display = "block";
            weatherInfo.style.display = "none";
        } else {
            const data = await response.json();
            console.log(data);

            // Update the HTML with weather data
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

            // Update the weather icon based on the weather condition
            switch (data.weather[0].main) {
                case 'Clouds':
                    weatherIcon.src = "images/clouds.png";
                    break;
                case 'Clear':
                    weatherIcon.src = "images/clear.png";
                    break;
                case 'Rain':
                    weatherIcon.src = "images/rain.png";
                    break;
                case 'Drizzle':
                    weatherIcon.src = "images/drizzle.png";
                    break;
                case 'Mist':
                    weatherIcon.src = "images/mist.png";
                    break;
                default:
                    weatherIcon.src = ""; // Handle other cases or set a default icon
            }

            // Show weather info and hide error message
            weatherInfo.style.display = "block";
            errorMessage.style.display = "none";
            
            // Reset search box
            searchBox.value = "";
        }   
    } catch (error) {
        console.error("Error fetching weather data:", error);
        // Handle general errors
        errorMessage.style.display = "block";
        weatherInfo.style.display = "none";
    }
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
