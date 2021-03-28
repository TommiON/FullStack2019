import {NewPatient} from '../types/types';
import {Gender} from '../types/types'

type Fields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown}

const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatient => {
    const patient: NewPatient = {
        name: parseName(name),
        ssn: parseSsn(ssn),
        dateOfBirth: parseBirth(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: []
    }

    return patient;
}

const parseName = (name: unknown): string => {
    if(!name || !isString(name)) {
        throw new Error('Missing or invalid name');
    }
    return name;
}

const parseSsn = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Missing or invalid ssn');
    }
    return ssn;
}

const parseBirth = (dob: unknown): string => {
    if(!dob || !isString(dob)) {
        throw new Error('Missing or invalid date of birth');
    }
    return dob;
}

const parseGender = (gender: unknown): string => {
    if(!gender || !isGender(gender)) {
        throw new Error('Missing or invalid gender');
    }
    return gender;
}

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Missing or invalid occupation');
    }
    return occupation;
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
}

export default toNewPatient;

