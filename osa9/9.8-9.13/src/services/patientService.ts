import patientData from '../../data/patients.json';
import {Patient, NewPatient, PublicPatient} from '../types/types';
import {v1 as uuid} from 'uuid';
const id = uuid();

const getEntries = ():PublicPatient[] => {
    return patientData.map(({id, name, occupation, gender, dateOfBirth}) => ({
            id,
            name,
            occupation,
            gender,
            dateOfBirth
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

const getOneEntry = (id: string): PublicPatient|undefined => {
    return patientData.find(p => p.id === id);
}

export default {getEntries, addEntry, getOneEntry};