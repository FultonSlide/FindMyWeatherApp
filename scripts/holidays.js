class Holidays {
    constructor(){
        this.apiKey = '03768f52e0e88c022b4f87ab428876ce768c179fc82302b11d8f5aada49785ef';
        this.year = '2019'; // Change to date of system
        this.month = '1'; //Change to month of system
        this.holidaysURI = 'https://calendarific.com/api/v2/holidays?&api_key=';
    }

    // Gets the local holidays the country the city the user entered is in
    async getHolidays(data) {
        const query = `${data.Country.ID}`;
        const response = await fetch(this.holidaysURI + this.apiKey + '&country=' + query + '&year=' + this.year + '&month=' + this.month + '&type=national');
        const result = await response.json();
        const countryHolidays = !result.error ? await result : 'N/A';
        console.log(countryHolidays);
        return countryHolidays;
    }
}