class Forecast{
    constructor(){
        this.key = 'DrRQ44OKJuI92G5JOimm0xbsF4MTZ9cV';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.forecastURI = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
        this.cityDetails = '';
        this.cityWeather = '';
        this.cityForecast = '';
    }

    //Returns the weather details of the city the user has entered
    async updateCity(city){
        const cityDetails = await this.getCity(city);
        const cityWeather = await this.getWeather(cityDetails.Key);
        const cityForecast = await this.getForecast(cityDetails.Key);
        this.cityDetails = await cityDetails;
        this.cityWeather = await cityWeather;
        this.cityForecast = await cityForecast;
        console.log(this.cityForecast);
        return { cityDetails,cityWeather,cityForecast };
    }

    //Get City Information
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }

    //Get Weather Information
    async getWeather(cityKey){
        const query = `${cityKey}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data;
    }

    //Get 5-day forecast Information
    async getForecast(cityKey){
        const query = `${cityKey}?apikey=${this.key}&details=true&metric=true`;
        const response = await fetch(this.forecastURI + query);
        const data = await response.json();
        return data;
    }
}
