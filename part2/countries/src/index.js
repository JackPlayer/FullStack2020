import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'

import Weather from './components/Weather'
import CountryDisplay from './components/CountryDisplay'


const App = () => {
  const [countries, setCountries] = useState([])
  const [newInput, setInput] = useState('')

  const endpoint = "https://restcountries.eu/rest/v2/all"

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  let renderLoading = null

  if (countries.length === 0) {
    renderLoading = (
      <p>Loading countries...</p>
    )
  }


  const handleClick = (event) => {
    const country = event.target.getAttribute('country')
    setInput(country)
  }
  let selectedCountries = countries
                              .filter((country) => country.name.includes(newInput))
        
  let countryRender = null;

  if (selectedCountries.length === 1) {
    countryRender = (
      <>
        <CountryDisplay country={selectedCountries[0]} />
        <Weather city={selectedCountries[0].capital} />
      </>
    )
  } else {
    countryRender = selectedCountries.map((country) => {
      return (
        <div key={country.name}>
          {country.name + " "}
          <button onClick={handleClick} country={country.name}>Show</button>
        </div>
      )
    })
  }

  
  return (
    <>
      Find Countries: <input value={newInput} onChange={(e) => setInput(e.target.value)}/>
      { renderLoading }
      { countryRender }
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
export default App