import { Card } from "dialogflow-fulfillment";
import { weatherApi } from "../services/weatherApi";

export const weatherInCity = async (conv: any) => {
    // Get data from parameters
    const city = conv.parameters['geo-city'];

    console.log(conv.parameters);

    // Initialize the weather api class
    const api = new weatherApi();

    // Create the call and get response to and from the weather api
    try {
        const apiResult = await api.getCurrentWeatherByCityName(city);
        console.log(apiResult);

        // Return the data in the form of a card
        return conv.add(new Card({
            title: `The weather in: ${apiResult.name}`,
            text: `Weather: ${apiResult.weather[0].description} \n
            Temperature: ${apiResult.main.temp} degrees celcius \n
            Humidity: ${apiResult.main.humidity} \n
            Wind: ${apiResult.wind.speed} km/h \n
            Sunrise: ${apiResult.sys.sunrise} \n
            Sunset: ${apiResult.sys.sunset}`,
        }));
    } catch(e) {
        console.error(e);
    }
}