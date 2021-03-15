import patientData from '../../data/patients.json';
import {Patient, NewPatient} from '../types/types';
import {v1 as uuid} from 'uuid';
const id = uuid();

const getEntries = ():Omit<Patient, 'ssn'>[] => {
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
    const d = '123';
    const s = '666';
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

export default {getEntries, addEntry};