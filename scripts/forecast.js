class Forecast{
    constructor(){
        this.key = 'rzGrwJVsbd3n5If4Zh3VEL2vUraLriKr';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }

    //Returns the weather details of the city the user has entered
    async updateCity(city){
        const cityDetails = await this.getCity(city);
        const cityWeather = await this.getWeather(cityDetails.Key);
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
