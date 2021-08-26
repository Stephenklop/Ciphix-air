import { flightApi } from "../services/flightApi";
import { weatherApi } from "../services/weatherApi";

export const weatherFromDepartureAndArrival = async (conv: any) => {

    // Get data from parameters
    const flightNumber: string = conv.parameters['flight-number'];
    const date: Date = conv.parameters['date'];

    // Initialize the api classes
    const api = new flightApi();
    const weatherapi = new weatherApi();

    // Create the call and get response to and from the flight api
    try {

        // Handle flight api data
        const flightApiResult = await api.getFlightDataByFlightNumberAndDate(flightNumber, date);

        // Check if any data is found and if not return error message
        if(flightApiResult.length === 0) return conv.add('There was no data for this flight and date. Please try again.')

        // Extract coordinates from departure location
        const latDeparture = flightApiResult[0].departure.airport.location.lat;
        const lonDeparture = flightApiResult[0].departure.airport.location.lon;

        // Extract coordinates from arrival location
        const latArrival = flightApiResult[0].arrival.airport.location.lat;
        const lonArrival = flightApiResult[0].arrival.airport.location.lon;

        console.log(flightApiResult[0]);

        // Get the weather forecast from the departure and arrival location
        const [departureWeather, arrivalWeather] = await Promise.all([
            weatherapi.getCurrentWeatherForecast(latDeparture, lonDeparture),
            weatherapi.getCurrentWeatherForecast(latArrival, lonArrival)
        ]);

        // Get the weather from the departure location based on leave time
        const finalDepartureWeather = calculateWeatherBasedOnTime(flightApiResult[0].departure.scheduledTimeLocal, departureWeather);

        // Get the weather from the arrival location based on arrival time
        const finalArrivalWeather = calculateWeatherBasedOnTime(flightApiResult[0].arrival.scheduledTimeLocal, arrivalWeather);


        console.log(finalDepartureWeather);
        console.log(finalArrivalWeather);


        // console.log(flightApiResult);
        // console.log('--------');
        // console.log('--------');
        // console.log(arrivalWeather);
        // console.log(departureWeather.)
        // Return the data in the form of a card

    } catch(e) {
        console.error(e);
    }
}

const calculateWeatherBasedOnTime = (time: string, weatherData: any) => {
    let lastWeatherElement;

    weatherData.hourly.forEach((element: any) => {
        const calculatedTime = convertIsoToUnixTimestamp(time);
        if(calculatedTime >= element.dt) {
            lastWeatherElement = element;
        }
    });

    return lastWeatherElement;
}

const convertIsoToUnixTimestamp = (isoString: string) => {
    var withOffset = Date.parse(isoString);
    return withOffset / 1000;
}