import {Entry, NewEntry} from '../types/types';

type Fields = { date: string, specialist: string, description: string, type: string}

const toNewEntry = ({date, specialist, description, type}: Fields): NewEntry => {
    switch(type) {
        case 'OccupationalHealthcare':
            return occupationalEntry(date, specialist, description);
    }


}

const occupationalEntry(date: string, specialist: string, description: string): Entry => {
    console.log(date, specialist, description);
}

// OccupationalHealthCareEntry | HealthCheckEntry | HospitalEntry

export default toNewEntry