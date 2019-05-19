import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            setCountries(response.data)
            setFilteredCountries(response.data)
        })
    }, [])

    const changeFiltering = (event) => {
        event.preventDefault()
        setFilter(event.target.value)
        console.log('filtteri: ', filter)
        setFilteredCountries(countries)
        const filtered = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
        setFilteredCountries(filtered)
    }

    return(
        <div>
            <form>Find countries <input value={filter} onChange={changeFiltering} /></form>
            <Maat filtered={filteredCountries}/>
        </div>
    )
}

const Maat = ({filtered}) => {
    if(filtered.length > 10) {
        return(
            <p>Too many matches, narrow down the filtering!</p>
        )
    }
    
    if(filtered.length > 1 && filtered.length <= 10) {
        filtered.map(country => {
            return(<p>{country.name}</p>)
        })
    }
    
    return(
        <ul>
            {filtered.map(country => <Maa key={country.name} country={country} />)}
        </ul>
    )
}

const Maa = ({country}) => {
    return(
        <div>
        <h1>{country.name}</h1>
        <p>Population: {country.population}</p>
        <p>Capital: {country.capital}</p>
        <h4>Languages</h4>
        <ul>
            {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
        </ul>
        <br></br>
        <img src={country.flag} width="200" alt="lippu"/>
        </div>
    )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));