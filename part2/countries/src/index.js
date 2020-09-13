import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'


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

  let selectedCountries = countries
                              .filter((country) => country.name.includes(newInput))
        
  let countryRender = null;

  if (selectedCountries.length === 1) {
    countryRender = (
      <>
        <h2>{selectedCountries[0].name}</h2>
        <p>Capital: {selectedCountries[0].capital}</p>
        <p>Population: {selectedCountries[0].population}</p>
        <h3>Languages</h3>
        <ul>
          {selectedCountries[0].languages.map((language) => <li>{language.name}</li>)}
        </ul>
        <img src={selectedCountries[0].flag} />
      </>
    )
  } else {
    countryRender = selectedCountries.filter((country) => <p>{country.name}</p> )
  }
  return (
    <div>
      Find Countries: <input value={newInput} onChange={(e) => setInput(e.target.value)}/>
      { renderLoading }
      { countryRender }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
export default App