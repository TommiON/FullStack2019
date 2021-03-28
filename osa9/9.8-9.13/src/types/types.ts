export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: string;
    ssn?: string;
    dateOfBirth?: string;
    entries: Entry[]
}

export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>