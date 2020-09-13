import React, {useEffect, useState} from 'react'

import axios from 'axios'

const Weather = ({city}) => {
    const [weather, setWeather] = useState([])

    const api_key = process.env.REACT_APP_API_KEY
    const endpoint = `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`

    useEffect(() => {
        axios
            .get(endpoint)
            .then((response) => setWeather(response.data))
    }, [endpoint])
   
    let weatherRender = (<p>No weather to display</p>)
    console.log(weather)
    if (weather.length !== 0) {
        weatherRender = (
            <div id="weather">
                <h3>Weather in {city}</h3>
                <p><strong>Temperature: </strong>{weather.current.temperature}</p>
                <img alt="Current weather" src={weather.current.weather_icons} />
                <p><strong>Wind: </strong>{weather.current.wind_speed} MPH from {weather.current.wind_dir}</p>
            </div>
        )
    }
    return weatherRender
}

export default Weather