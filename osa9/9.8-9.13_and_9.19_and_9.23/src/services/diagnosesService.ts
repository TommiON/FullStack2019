import diagnosesData from '../../data/diagnoses.json'
import {Diagnosis} from '../types/types'

const getEntries = (): Array<Diagnosis> => {
    return diagnosesData;
}

export default { getEntries }

