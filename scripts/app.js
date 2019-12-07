const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

//Updates the UI with the weather information of the city the user has entered
const updateUI = (data) => {

    //Destructure properties
    const { cityDetails, cityWeather } = data;

    //Update time img & weather icon
    let timeSrc = null;
    const iconSrc = `img/icons/${cityWeather[0].WeatherIcon}.svg`;

    if(cityWeather[0].IsDayTime){
        timeSrc = "img/day.svg";
    } else {
        timeSrc = "img/night.svg";
    }

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

//Returns the weather details of the city the user has entered
const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const cityWeather = await getWeather(cityDetails.Key);

    return { cityDetails,cityWeather };
};

cityForm.addEventListener('submit', (e) => {
    //Prevent default action
    e.preventDefault();

    //Get city value
    const city = e.target.city.value.trim().toLowerCase();
    cityForm.reset();

    //Update UI with city info
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});

