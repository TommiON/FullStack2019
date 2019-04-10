import React from 'react'

const FilterForm = (props) => {
    return(
        <div>
            Rajaa näytettäviä: <input value={props.arvo} onChange={props.kasittelija} />
        </div>
    )
}

export default FilterForm