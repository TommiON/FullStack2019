import React from "react";
import { useStateValue } from "../state";
import { Patient } from "../types";

import {useParams} from "react-router-dom";
import { prependOnceListener } from "process";

import DiagnosisDetails from './DiagnosisDetails'
import EntryDetails from './EntryDetails'

const PatientDetailsPage: React.FC = () => {

    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const patient: Patient | undefined = Object.values(patients).find(p => p.id === id);

    if(patient === undefined) {
        return <p>No such patient...</p>
    }

    /*
    const DiagnosisDetails = ({code}: {code: string}) => {
        const diag = diagnoses[code];
        console.log('** DIAGNOOSI', diag, typeof(diag))
        if(diag !== undefined) {
            return(
                <p>{code} {diag.name}</p>
            )
        } else {
            return <div></div>
        }
        
    }
    */

    return(
        <div>
            <h1>{patient.name}</h1>
            <p>ssn: {patient.ssn}</p> 
            <p>gender: {patient.gender}</p>
            <p>date of birth: {patient.dateOfBirth}</p>
            <p>occupation: {patient.occupation}</p>
            <h3>Entries</h3>
            {patient.entries.map(e => <EntryDetails entry={e} />)}
        </div>
        
    )
}



export default PatientDetailsPage;

