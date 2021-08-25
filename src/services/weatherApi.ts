const fetch = require("node-fetch");

export class weatherApi {
    // Option for personal weather unit measurement
    private UNITS_OF_MEASUREMENT: String = '';

    // Api url where the calls are send to
    private BASE_URL: String = '';

    constructor() {
        this.UNITS_OF_MEASUREMENT = 'metric';
        this.BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.WEATHER_API_KEY}&units=${this.UNITS_OF_MEASUREMENT}`
    }

    // Creates, executes and gives response to and from the api call
    private createCall = (url: string) => {
        return new Promise<string>((resolve, reject) => {
            fetch(url)
            .then((res: any) => res.json())
            .then((res: any) => resolve(res))
            .catch((err: any) => reject(err));
        })
    }

    // Get weather by city name with given cityName parameter.
    public getCurrentWeatherByCityName(cityName: string) {
        return new Promise<any>((resolve, reject) => {
            console.log(`${this.BASE_URL}&q=${cityName}`);
            this.createCall(`${this.BASE_URL}&q=${cityName}`)
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
    }

    // Get weather by coordinates
    public async getCurrentWeatherByCoordinates (lat: string, lon: string) {
        const apiResult = await this.createCall(`${this.BASE_URL}&lat=${lat}&lon=${lon}}`);
    }
}