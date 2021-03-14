import patientData from '../../data/patients.json';
import {Patient} from '../types/types';
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

const addEntry = (name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string) => {
    const patient = {
        id: id,
        name: name,
        dateOfBirth: dateOfBirth,
        ssn: ssn,
        gender: gender,
        occupation: occupation
    }
    patientData.push(patient);
    console.log('uusi potilas: ', patient);
    return patient;
}

export default {getEntries, addEntry};