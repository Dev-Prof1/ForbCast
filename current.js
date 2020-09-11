/*linking search box to api*/
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
        if (evt.keyCode == 13) {
        console.log("SearchBoxValue",searchbox.value);
        getweather(searchbox.value);
                
    }
}

function details () {
	let details = document.getElementsByTagName("details");
	if (true) {

	} else if (true) {

	}else {

	}
}

/*      APP constants and variables*/
const Kelvin = 273;

/*API key*/
const key = "3d59b0521485f97d74ada8dbec664ee9";


/*selection of parameter element for current*/
//const notificationElement = document.querySelector(".notification")
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description small");
const windElement = document.querySelector(".wind p");
const hilowElement = document.querySelector(".hi-low p");
const humiditylowElement = document.querySelector(".humidity small");
const presureElement = document.querySelector(".presure small");



//App data
const weather = {};

weather.temperature = {
        unit : "celsius"
}

/*display weather by Changing the inner html demo of every element to save its value */
                function displayweather(){
            /*display of extracted current weather report*/
                        tempElement.innerHTML = `${weather.temperature.value}<span>&#7506C</span>`;
                        descElement.innerHTML = weather.description;
            iconElement.innerHTML = `<img src= "icons/${weather.iconId}.png"/>` ;
            windElement.innerHTML = `${weather.wind}`;
            hilowElement.innerHTML = `${ weather.temp_min}<span>&#7506C</span> / ${weather.temp_max}<span>&#7506C</span>`;
            humiditylowElement.innerHTML = `${weather.humidity}`;
            presureElement.innerHTML = `${weather.presure}`;
                }
        


/*linking the API*/
function getweather(){
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${searchbox.value}&appid=${key}`;
        fetch(api)
        .then(function(response){
                                        let data = response.json();
                                        return data;
                                })
                                .then(function(data){
                                weather.temperature.value = Math.floor(data.main.temp - Kelvin);
                                weather.description = data.weather[0].description;
                                weather.iconId = data.weather[0].icon;
                                weather.wind = data.wind.speed;
                                weather.temp_min = Math.floor(data.main.temp_min - Kelvin);
                                weather.temp_max = Math.floor(data.main.temp_max - Kelvin);
                                weather.humidity = Math.round(data.main.humidity);
                                weather.presure = Math.round(data.main.presure);
                                weather.longitude = Math.round(data.coord.lon);
                                weather.latitude = Math.round(data.coord.lat);
                                console.log("latitude", weather.latitude);
                                            })
                                .then(function(){
                    
                                        displayweather();
                    getdailyweather(weather.latitude, weather.longitude);
                    
                                })
}

/*selecting the parameters for daily weather report*/
const dailypressureElement = document.querySelector(".dailypressure p");
const dailywindElement = document.querySelector(".dailywind p");
const dailytimeElement = document.querySelector(".dailytime p");
const dailydescElement = document.querySelector(".dailydesc p");
const dailyiconElement = document.querySelector(".dailyicon");
const dailyhumidityElement = document.querySelector(".dailyhumidity p");
const dailytempElement = document.querySelector(".dailytemp");
const dailydayElement = document.querySelector(".dailyday p");

const timezoneElement = document.querySelector(".location p");

/*selecting parameters for hourly weather report*/
const hourlypressureElement = document.querySelector(".hourlypressure p");
const hourlywindElement = document.querySelector(".hourlywind p");
const hourlytimeElement = document.querySelector(".hourlytime p");
const hourlyhumidityElement = document.querySelector(".hourlyhumidity p");
const hourlytempElement = document.querySelector(".hourlytemp p");


debugger;
const dailyweather = {};

dailyweather.dailytemperature = {
        unit : "celsius"
};
                
/*display weather by Changing the inner html demo of every element to save its value */
                function displaydailyweather(){
            /*display of extracted hourly weather report*/
                        dailytempElement.innerHTML = `${dailyweather.dailytemperature}<span>-&#7506C</span>`;
                        dailydescElement.innerHTML = dailyweather.dailydescription;
                        dailyiconElement.innerHTML = `<img src= "icons/${dailyweather.dailyiconId}.png"/>` ;
            dailywindElement.innerHTML = `${dailyweather.dailywind}`;
            dailyhumidityElement.innerHTML = `${dailyweather.dailyhumidity}`;
            dailypressureElement.innerHTML = `${dailyweather.dailypressure}`;
            dailytimeElement.innerHTML = `${dailyweather.dailytime}`;
            dailydayElement.innerHTML = `${dailyweather.dailydays}`;
                    
                    timezoneElement.innerHTML = `${dailyweather.timezone}`;
            
            
            /*display of extracted daily weather report*/
            hourlytempElement.innerHTML = `${dailyweather.hourlytemperature}<span>&#7506C</span>`;
            hourlytimeElement.innerHTML = dailyweather.hourlytime;
            hourlywindElement.innerHTML = `${dailyweather.houylywind}`;
            hourlyhumidityElement.innerHTML = `${dailyweather.hourlyhumidity}`;
            hourlypressureElement.innerHTML = `${dailyweather.hourlypresure}`;
                }

                
        function getdailyweather(latitude, longitude){
            let generalapi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&
exclude={part}&appid=${key}`;
            fetch(generalapi)
                .then(function(reaction){
                       let data = reaction.json();
                       return data;
                        })
                        .then(function(data){
                            console.log("captured info", data);
                            /*getting result from the api for daily report*/
                            dailyweather.dailydays = data.daily[0].temp.day;
                            dailyweather.dailytemperature = Math.floor(data.daily.temp - Kelvin);
                            dailyweather.dailydescription = data.daily[0].weather[0].description;
                            dailyweather.dailyiconId = data.daily[0].weather[0].icon;
                            dailyweather.dailywind = data.daily[0].wind_speed;
                            dailyweather.dailytime = data.daily[0].dt;
                            dailyweather.dailyhumidity = Math.round(data.daily[0].humidity);
                            dailyweather.dailypressure = Math.round(data.daily[0].presure);
                
                            dailyweather.timezone = data.timezone;

                            /*getting result from the api for hourly report*/
                            dailyweather.hourlytemperature = Math.floor(data.hourly[0].temp - Kelvin);
                            dailyweather.hourlywind = data.hourly[0].wind_speed;
                            dailyweather.hourlyhumidity = Math.round(data.hourly[0].humidity);
                            dailyweather.hourlypresure = Math.round(data.hourly[0].presure);
                            dailyweather.hourlytime = data.hourly[0].dt;
                console.log("daily weather", data.daily[0].humidity);
                        })
                        .then(function(){
                            displaydailyweather();
                           
                        })
        }




                /*Temperature conversion between celsius and fahrenheit*/
                function celsiusToFahrenheit(temperature){
                        return (temperature * 9/5) + 32;
                }


                /*Event listener when the temperature is clicked*/
                tempElement.addEventListener("click", function(){
                        if (weather.temperature.value === undefined) return;
                        if (weather.temperature.unit === "celsius") {
                                let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
                                fahrenheit = math.floor(fahrenheit);
                                tempElement.innerHTML = `${fahrenheit}<span>&#7506F</span>`;
                                weather.temperature.unit = "fahrenheit"
                        }else{
                                tempElement.innerHTML = `${weather.temperature.value}<span>&#7506C</span>`;
                                weather.temperature.unit = "celsius"
                        }
                })


function dateBuilder (d) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];

        return `${day} ${date} ${month} ${year}`;
}




