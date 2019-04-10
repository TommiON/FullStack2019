import ReactDOM from 'react-dom';
import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
import FilterForm from './components/FilterForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123456' },
    { name: 'Hanna', number: '666'},
    { name: 'Tommi', number: '123'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  const lisaaNimi = (event) => {
      event.preventDefault()
      const nimet = persons.map(henkilo => henkilo.name)
      if(nimet.includes(newName)) {
          alert(`${newName} on jo luettelossa!`)
      } else {
        const uusiHenkilo = {
            name: newName,
            number: newNumber
        }
        setPersons(persons.concat(uusiHenkilo))
        setNewName('')
        setNewNumber('')
      }
  }

  const nimiTekstiMuuttuu = (event) => {setNewName(event.target.value)}
  const numeroTekstiMuuttuu = (event) => {setNewNumber(event.target.value)}
  const rajausTekstiMuuttuu = (event) => {setNewFilter(event.target.value)}

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <FilterForm arvo={newFilter} kasittelija={rajausTekstiMuuttuu} />
      <h2>Lisää uusi</h2>
      <PersonForm
        klikkauskasittelija={lisaaNimi}
        nimiarvo={newName}
        nimikasittelija={nimiTekstiMuuttuu}
        numeroarvo={newNumber}
        numerokasittelija={numeroTekstiMuuttuu} />
      <h2>Numerot</h2>
      <Persons persons={persons} suodatin={newFilter} />
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));
