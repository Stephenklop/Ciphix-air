export class weatherApi {
    // Api url where the calls are send to.
    private BASE_URL: String = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.WEATHER_API_KEY}`;

    // Creates, executes and gives response to and from the api call
    private createCall = (url: string) => {
        return new Promise<string>((resolve, reject) => {
            fetch(url)
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
    }


    public async getCurrentWeatherByCityName(cityName: string) {
        const apiResult = await this.createCall(`${this.BASE_URL}&q=${cityName}`);
    }

    public async getCurrentWeatherByCoordinates(lat: string, lon: string) {
        const apiResult = await this.createCall(`${this.BASE_URL}&lat=${lat}&lon=${lon}}`);
    }
}