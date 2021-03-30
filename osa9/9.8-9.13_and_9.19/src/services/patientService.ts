// import patientData from '../../data/patients.json';
import patientData from '../../data/patients';
import {Patient, NewPatient, PublicPatient} from '../types/types';
import {v1 as uuid} from 'uuid';
const id = uuid();

const getEntries = ():PublicPatient[] => {
    return patientData.map(({id, name, occupation, gender, dateOfBirth, entries}) => ({
            id,
            name,
            occupation,
            gender,
            dateOfBirth,
            entries: entries
        })
    );
}

const addEntry = (entry: NewPatient): Patient => {
    let d = '123';
    if(entry.dateOfBirth !== undefined) {
        d = entry.dateOfBirth;
    }
    let s = '666';
    if(entry.ssn !== undefined) {
        s = entry.ssn;
    }
    const patient = {
        id: id,
        dateOfBirth: d,
        ssn: s,
        ...entry
    };
    patientData.push(patient);
    console.log('uusi potilas: ', patient);
    return patient;
}

const getOneEntry = (id: string): Patient|undefined => {
    let patient = patientData.find(p => p.id === id);
    let response;
    if(patient !== undefined) {
        response = {...patient}
    }
    console.log('***', response);
    return response;
}

export default {getEntries, addEntry, getOneEntry};