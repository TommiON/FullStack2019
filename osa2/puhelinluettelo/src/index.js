import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import FilterForm from './components/FilterForm'
import Persons from './components/Persons'
import DbService from './services/dbService'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ statusMessage, setStatusMessage] = useState(null)

  useEffect(() => {
    DbService
    .getAll()
    .then(saatu => setPersons(saatu))
  }, [])

  const lisaaNimi = (event) => {
      event.preventDefault()
      const nimet = persons.map(henkilo => henkilo.name)
      if(nimet.includes(newName)) {
        if (window.confirm(`Nimi on jo luettelossa, korvataanko numero?`)) {
          const nro = persons.find(pers => pers.name === newName).id
          DbService.replace(nro, newName, newNumber)
          .then(saatu => setPersons(persons.map(person => person.id === saatu.id ? saatu : person)))
          .then(setStatusMessage(`Käyttäjän ${newName} numero muutettu`))
          .then(setNewName(''))
          .then(setNewNumber(''))
          .catch(error => {
            setStatusMessage(`Ei onnistu, nimeä ei enää ole luettelossa`)
          })   
          setTimeout(() => {setStatusMessage(null)}, 3000)
        }
      } else {
        const uusiHenkilo = {
            name: newName,
            number: newNumber
        }
        DbService
        .add(uusiHenkilo)
        .then(saatu => setPersons(persons.concat(saatu)))
        .then(setStatusMessage(`${newName} lisätty`))
        .then(setNewName(''))
        .then(setNewNumber(''))
        setTimeout(() => {setStatusMessage(null)}, 3000)
      }
  }

  const poistaNimi = (id) => {
    if (window.confirm(`Poistetaanko henkilö luettelosta?`)) {
        DbService
        .remove(id)
        .then(paluu => setPersons(persons.filter(person => person.id !== id)))
        .then(setStatusMessage(`Poistettu`))
    }
    setTimeout(() => {setStatusMessage(null)}, 3000)
  }

  const nimiTekstiMuuttuu = (event) => {setNewName(event.target.value)}
  const numeroTekstiMuuttuu = (event) => {setNewNumber(event.target.value)}
  const rajausTekstiMuuttuu = (event) => {setNewFilter(event.target.value)}

  const Notification = ({viesti}) => {
    const notificationStyle = {
      color: 'green',
      borderStyle: 'solid',
      background: "lightgrey",
      borderRadius: 5,
      marginBottom: 10,
      padding: 10
    }
    if(viesti === null) {
      return null
    }
    return(
      <div style={notificationStyle}>{viesti}</div>
    )
  }
  
  return (
    <div>
      <Notification viesti={statusMessage} />
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
      <Persons persons={persons} suodatin={newFilter} kasittelija={poistaNimi} />
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));
