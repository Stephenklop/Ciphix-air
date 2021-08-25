import fetch from 'node-fetch';

export class flightApi {
    // Api url where the calls are send to
    private BASE_URL: string = ''

    constructor() {
        this.BASE_URL = `https://aerodatabox.p.rapidapi.com`;
    }

    // Creates, executes and gives response to and from the api call
    private createCall = (url: string) => {
        return new Promise<string>((resolve, reject) => {
            fetch(url, {
                headers: {
                    'x-rapidapi-host': 'aerodatabox.p.rapidapi.com',
                    'x-rapidapi-key': 'c13b762d3emsh491a1b379162b8fp112015jsn79d5efcaf33e'
                  }
            })
            .then((res: any) => res.json())
            .then((res: any) => resolve(res))
            .catch((err: any) => reject(err));
        })
    }

    // Get flight data based on flight number and date
    public getFlightDataByFlightNumberAndDate(flightNumber: string, date: Date) {
        return new Promise<any>((resolve, reject) => {
            this.createCall(`${this.BASE_URL}/flights/number/${flightNumber.trim()}/${this.formatDate(date)}`)
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
    }

    // Format a ISO date into a date that the api can understand
    private formatDate(date: Date) {
        const newDate = new Date(date);
        const year = newDate.getFullYear();
        const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
        const day = ("0" + newDate.getDate()).slice(-2)

        return `${year}-${month}-${day}`;
    }
}