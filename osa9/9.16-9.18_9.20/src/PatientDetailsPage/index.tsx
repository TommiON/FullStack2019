import React from "react";
import { useStateValue } from "../state";
import { Patient } from "../types";

import {useParams} from "react-router-dom";

const PatientDetailsPage = () => {

    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const patient: Patient | undefined = Object.values(patients).find(p => p.id === id);

    if(patient === undefined) {
        return <p>No such patient...</p>
    }

    return(
        <div>
            {console.log('frontin patient', patient)}
            <h1>{patient.name}</h1>
            <p>ssn: {patient.ssn}</p> 
            <p>gender: {patient.gender}</p>
            <p>date of birth: {patient.dateOfBirth}</p>
            <p>occupation: {patient.occupation}</p>
            <h3>Entries</h3>
            {patient.entries.map(e => 
                <div key={e.id}>
                    {e.date} {e.description}
                    {(e.type === 'OccupationalHealthcare'|| e.type ==='Hospital')
                        ? 
                            <div>{e.diagnosisCodes?.map(d => <i key={d}>{d}<br></br></i>)}</div> 
                        : 
                            <p></p>}
                </div>
            )}
        </div>
        
    )
}

export default PatientDetailsPage;

