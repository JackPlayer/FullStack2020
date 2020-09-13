import React from 'react'

const CountryDisplay = ({country}) => {

    return (
        <div id="country">
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <ul>
            {country.languages.map((language) => <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
            <img alt={`Flag of ${country.name}`} src={country.flag} />
        </div>  
    )
}

export default CountryDisplay