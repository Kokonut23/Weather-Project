// changes in code have to be implemented in CodeSandbox as well
let now=new Date();

let time=document.querySelector("#time");
let weekday=document.querySelector("#weekday");
let date=document.querySelector("#date");
let year=now.getFullYear();



function formatDay(timestamp) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day=days[now.getDay()];
    return `${day}`;
}

function formatDate (timestamp) {
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    let month = months[now.getMonth()];
    
    let numbers=["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th","16th","17th","18th","19th","20th","21st","22nd","23rd","24th","25th","26th","27th","28th","29th","30th","31st"];
    let currentDate=numbers[now.getDate()-1];
    
    return `${month} ${currentDate} ${year}`;
}

function formatTime(timestamp) {
        
    let minutes=now.getMinutes();
    if (minutes<10) {
        minutes=`0${minutes}`;
    }
    let hours=now.getHours();
    if (hours<10) {
        hours=`0${hours}`;
    }
    
    return `${hours}:${minutes}`;
}
           
function displayWeatherCondition (response) {
    celsiusTemperature=response.data.main.temp;
    document.querySelector("h1").innerHTML=response.data.name;
    document.querySelector("#temperature").innerHTML=Math.round(celsiusTemperature);
    document.querySelector("#unit").innerHTML=`°C`;
    document.querySelector("#humidity").innerHTML= response.data.main.humidity; 
    document.querySelector("#wind").innerHTML= Math.round(response.data.wind.speed); 
    document.querySelector("#weather-condition").innerHTML=response.data.weather[0].main;
    document.querySelector("#icon").setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#icon").setAttribute ("alt",response.data.weather[0].description);
    weekday.innerHTML=formatDay(response.data.dt*1000);
    date.innerHTML=formatDate(response.data.dt*1000);
    time.innerHTML=formatTime(response.data.dt*1000);
}

function searchCity(city) {
 let apiKey="65c37186688416b99a1a5f898893efdd";
        let units="metric";    
        let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
        axios.get(apiUrl).then(displayWeatherCondition);
}

      function handleSubmit (event) {
        event.preventDefault();
       let city=document.querySelector("#city-input").value; 
       searchCity(city);
        }
        
let cityForm=document.querySelector("#city-form");
cityForm.addEventListener("submit",handleSubmit);


function searchLocation (position) {
    let apiKey="65c37186688416b99a1a5f898893efdd";
    let units="metric"; 
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation (event) {
        event.preventDefault()
        navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton=document.querySelector("#location");
currentLocationButton.addEventListener("click",getCurrentLocation);



//Change temperature unit
function changeUnitFahrenheit (event) {
    event.preventDefault();
    let temperature=document.querySelector("#temperature");
    let unit=document.querySelector("#unit");
    let fahrenheitTemperature=(celsiusTemperature*9)/5+32;
    temperature.innerHTML=Math.round(fahrenheitTemperature);
    unit.innerHTML=`°F`;
}
let fahrenheit=document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click",changeUnitFahrenheit);

function changeUnitCelsius (event) {
    event.preventDefault();
    let temperature=document.querySelector("#temperature");
    let unit=document.querySelector("#unit");
    temperature.innerHTML=Math.round(celsiusTemperature);
    unit.innerHTML=`°C`;
}

let celsiusTemperature=null;

let celsius=document.querySelector("#celsius");
celsius.addEventListener("click",changeUnitCelsius);

searchCity ("Budapest");

//change temperature unit to fahrenheit for all the numbers
//add the Bonus Feature for Celsius as well
