import React from 'react'

const PersonForm = (props) => {
    return(
        <div>
             <form onSubmit={props.klikkauskasittelija}>
            <div>
            nimi: <input value={props.nimiarvo} onChange={props.nimikasittelija}/>
            </div>
            <div>
            numero: <input value={props.numeroarvo} onChange={props.numerokasittelija}/>
            </div>
            <div>
            <button type="submit">lisää</button>
            </div>
            </form>
        </div>
    )
}

export default PersonForm