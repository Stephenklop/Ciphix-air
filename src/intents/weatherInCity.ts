import { Card } from "dialogflow-fulfillment";
import { weatherApi } from "../services/weatherApi";

export const weatherInCity = async (conv: any) => {

    // Get data from parameters
    const city = conv.parameters['geo-city'];

    // Initialize the weather api class
    const api = new weatherApi();

    // Create the call and get response to and from the weather api
    try {
        const apiResult = await api.getCurrentWeatherByCityName(city);
        console.log(apiResult);

        console.log(apiResult.sys.sunrise, apiResult.sys.sunset)

        // Return the data in the form of a card
        return conv.add(new Card({
            title: `The weather in: ${apiResult.name} \n`,
            text: `*Weather:* ${apiResult.weather[0].description} \n*Temperature:* ${apiResult.main.temp} °C \n*Humidity:* ${apiResult.main.humidity}% \n*Wind:* ${apiResult.wind.speed} km/h \n*Sunrise:* ${convertUnixToTimeString(apiResult.sys.sunrise)} \n*Sunset:* ${convertUnixToTimeString(apiResult.sys.sunset)}`,
        }));
    } catch(e) {
        console.error(e);
    }
}

const convertUnixToTimeString = (unix: number) => {
    const date = new Date(unix * 1000);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();

    return `${hours}:${minutes.substr(-2)}`;
}