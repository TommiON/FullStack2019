import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

const App = () => {
    var [countries, setCountries] = useState([])
    var [filter, setFilter] = useState('')
    var [filteredCountries, setFilteredCountries] = useState([])

    useEffect(() => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            setCountries(response.data)
            setFilteredCountries(response.data)
        })
    }, [])

    const changeFiltering = (event) => {
        setFilter(event.target.value)
        setFilteredCountries(countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase())))
        console.log('maita: ', filteredCountries.length)
        console.log(filteredCountries)
    }

    const chooseCountry = (countryName) => {
        setFilter(countryName)
        setFilteredCountries(countries.filter(country => country.name === countryName))
    }

    return(
        <div>
            <h1>Find countries</h1>
            <form><input value={filter} onChange={changeFiltering} /></form>
            <Maat filtered={filteredCountries} handler={chooseCountry}/>
        </div>
    )
}

const Maat = (props) => {
    console.log('maita:', props.filtered.length)
    if(props.filtered.length > 10 || props.filtered === null) {
        return(
            <p>Too many matches, narrow down the filtering!</p>
        )
    }
    
    if(props.filtered.length > 1 && props.filtered.length <= 10) {
        return(
            <ul>
            {props.filtered.map(country => <MaanNimi key={country.name} country={country} handler={props.handler} />)}
            </ul>
        )
    }
   
    return(
        <ul>
            {props.filtered.map(country => <Maa key={country.name} country={country} />)}
        </ul>
    )
}

const MaanNimi = (props) => {
    return(
        <div>
            <h3>{props.country.name}</h3>
            <button onClick={() => props.handler(props.country.name)}>Look up this country</button>
        </div>
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
        <Saa capital={country.capital} />
        </div>
    )
}

const Saa = ({capital}) => {
    var [weatherInfo, setWeatherInfo] = useState('')
    useEffect(() => {
        axios
        .get(`http://api.apixu.com/v1/current.json?key=4eeda46b6dc84d118e454545192805&q=${capital}`)
        .then(response => {
            setWeatherInfo(response.data.current.condition.text)
        })
    })
    
    return(
        <div>
            <h3>Weather in capital</h3>
            {weatherInfo}
        </div>
    )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));