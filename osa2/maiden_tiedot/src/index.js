import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import axios from 'axios'

// tehty: kaman hakaminen countries-muuttujaan, filtterikenttä

const App = () => {
    const [countries, setCountries] = useState('')
    const [filteredCountries, setFilteredCountries] = useState(countries)
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            setCountries(response.data)
        })
    }, [])

    const changeFiltering = (event) => {
        setFilter(event.target.value)
    }

    return(
        <div>
        Find countries <input value={filter} onChange={changeFiltering} />
        </div>
        
    )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));