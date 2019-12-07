const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

//Updates the UI with the weather information of the city the user has entered
const updateUI = (data) => {
    const cityDetails = data.cityDetails;
    const cityWeather = data.cityWeather;

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

