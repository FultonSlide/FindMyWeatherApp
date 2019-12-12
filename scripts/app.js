const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details-weather');
const currentTime = document.querySelector('.current-time');
const time = document.querySelector('img.time-weather');
const icon = document.querySelector('.icon-weather img');
const content = document.querySelector('.content');
const forecast = new Forecast();
const cityTime = new Time();
let timeSet = false;

//Updates the local time of the city in the UI
const updateTime = (localTime) => {
    //Setting local time
    timeSet = localTime !== 'N/A' ? true : false;
    
    //Update current time template
    currentTime.innerHTML = `
        <div class="my-3">Local Time:</div>
        <div class="local-time">${localTime}</div>
    `;
}

//Updates the UI with the weather information of the city the user has entered
const updateUI = (data) => {

    console.log(data);

    //Destructure properties
    const { cityDetails, cityWeather } = data;

    //Update time img & weather icon
    const timeSrc = cityWeather[0].IsDayTime ? "img/day.svg" : "img/night.svg";
    const iconSrc = `img/icons/${cityWeather[0].WeatherIcon}.svg`;

    time.setAttribute('src', timeSrc);
    icon.setAttribute('src', iconSrc);

    //Update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${cityWeather[0].WeatherText}</div>
        <div class="display-4 my-4">
            <span>${cityWeather[0].Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //Remove d-none class if present
    if(content.classList.contains('d-none')){
        content.classList.remove('d-none');
    }
};

//Listens for form submission
cityForm.addEventListener('submit', (e) => {
    //Prevent default action
    e.preventDefault();

    //Get city value
    const city = e.target.city.value.trim().toLowerCase();
    cityForm.reset();

    //Set local storage
    localStorage.setItem('city', city);

    //Update UI with city info
    forecast.updateCity(city)
        .then(data => {
            cityTime.getTime(data.cityDetails).then((localTime) => {
                updateTime(localTime);
                updateUI(data);
            }).catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => {
            cityTime.getTime(data.cityDetails).then((localTime) => {
                updateTime(localTime);
                updateUI(data);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
}

setInterval(() => {
    if(timeSet){
        console.log('local time is set!');
        cityTime.getTime(forecast.cityDetails).then((data) => {
            updateTime(data);
        }).catch(err => console.log(err));
    }
}, 10000);

