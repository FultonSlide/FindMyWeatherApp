const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

//Updates the UI with the weather information of the city the user has entered
const updateUI = (data) => {

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
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
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
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}

