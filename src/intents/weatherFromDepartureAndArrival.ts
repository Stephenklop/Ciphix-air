import { flightApi } from "../services/flightApi";

export const weatherFromDepartureAndArrival = async (conv: any) => {

    console.log(conv.parameters)

    // Get data from parameters
    const flightNumber: string = conv.parameters['flight-number'];
    const date: Date = conv.parameters['date'];

    console.log(flightNumber);

    // Initialize the flight api class
    const api = new flightApi();

    // Create the call and get response to and from the flight api
    try {
        const apiResult = await api.getFlightDataByFlightNumberAndDate(flightNumber, date);
        console.log(apiResult);
        console.log(apiResult[0].departure);
        const time = calculateTimeBetweenDepartureAndArrival(apiResult[0].departure.scheduledTimeUtc, apiResult[0].arrival.scheduledTimeUtc);

        console.log(time);
        // Return the data in the form of a card

    } catch(e) {
        console.error(e);
    }
}

const calculateTimeBetweenDepartureAndArrival = (departureTime: Date, arrivalTime: Date) => {
    const newDepartureTime = new Date(departureTime);
    const newArrivalTime = new Date(arrivalTime);
    return  newArrivalTime.getTime() - newDepartureTime.getTime();
}