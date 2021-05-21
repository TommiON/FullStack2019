import React from "react";
import { useStateValue } from "../state";
import { Patient } from "../types";
import AddEntryModal from '../AddEntryModal';
import { Container, Table, Button } from "semantic-ui-react";

import {useParams} from "react-router-dom";
import { prependOnceListener } from "process";

import DiagnosisDetails from './DiagnosisDetails'
import EntryDetails from './EntryDetails'
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientDetailsPage: React.FC = () => {

    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const patient: Patient | undefined = Object.values(patients).find(p => p.id === id);

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
      };

    const submitNewEntry = async (values: EntryFormValues) => {
        console.log('*** Submitting...', values)
        
    };

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
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
        </div>
        
    )
}



export default PatientDetailsPage;

