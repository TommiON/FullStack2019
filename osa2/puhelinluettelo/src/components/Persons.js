import React from 'react'

const Persons = (props) => {
    const henkilot = props.persons.filter(henkilo => henkilo.name.includes(props.suodatin))
    const renderoitavatHenkilot = henkilot.map(henkilo => <p key={henkilo.name}>{henkilo.name} {henkilo.number}</p>)
    return(renderoitavatHenkilot)
}

export default Persons