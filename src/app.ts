import express from 'express'
import cors from 'cors'
 
import { WebhookClient } from 'dialogflow-fulfillment'

// intent method imports
import { fallback } from './intents/fallback'
import { welcome } from './intents/welcome'
import { weatherInCity } from './intents/weatherInCity'
import { weatherWithTimeAndCity } from './intents/weatherWithTimeAndCity'
import { weatherFromDepartureAndArrival } from './intents/weatherFromDepartureAndArrival';

process.env.PORT=`${8080}`;
process.env.WEATHER_API_KEY='5733e67d5a7c3c16581f319d418556ff'
process.env.FLIGHT_API_KEY='4e576aeecd5c9347a93d7b691372b2e4';

const app = express()   

const PORT: number = parseInt(process.env.PORT) || 8080;

app.use(
    cors({ origin: '*' }),
    express.json(),
)

// Map of intent-name to their respective method
const intents = new Map<string, (agent: any) => void>()

// Set specific intent-name to it's respective method
intents.set('Default Fallback Intent', fallback)
intents.set('Default Welcome Intent', welcome) 
intents.set('Weather In City Intent', weatherInCity)
intents.set('Weather With Time And City Intent', weatherWithTimeAndCity)
intents.set('Weather From Departure And Arrival Location Intent', weatherFromDepartureAndArrival)

app.post('/', async (req, res) => {
    const agent: any = new WebhookClient({ request: req, response: res })
    await agent.handleRequest(intents)
})

app.listen(PORT, () => console.log(`Server started on port: ${PORT}!`))