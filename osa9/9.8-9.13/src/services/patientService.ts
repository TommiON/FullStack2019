import patientData from '../../data/patients.json';
import {Patient} from '../types/types';

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

export default {getEntries};