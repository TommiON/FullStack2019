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
            <h1>{patient.name}</h1>
            <p>ssn: {patient.ssn}</p> 
            <p>gender: {patient.gender}</p>
            <p>date of birth: {patient.dateOfBirth}</p>
            <p>occupation: {patient.occupation}</p>
        </div>
        
    )
}

export default PatientDetailsPage;

