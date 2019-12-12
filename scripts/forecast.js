class Forecast{
    constructor(){
        this.key = 'i3khXTCPD2qTyYrKosuUtRTURgPoGVDh';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.cityDetails = '';
        this.cityWeather = '';
    }

    //Returns the weather details of the city the user has entered
    async updateCity(city){
        const cityDetails = await this.getCity(city);
        const cityWeather = await this.getWeather(cityDetails.Key);
        this.cityDetails = await cityDetails;
        this.cityWeather = await cityWeather;
        return { cityDetails,cityWeather };
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
}
