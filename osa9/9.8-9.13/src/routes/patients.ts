import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils/toNewPatient';

const router = express.Router();

router.get('/', (_req, res) => {
    const response = patientService.getEntries();
    res.send(response);
});

router.post('/', (req, res) => {
    // const {name, dateOfBirth, ssn, gender, occupation} = req.body;
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addEntry(newPatient);
        res.json(addedPatient);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/:id', (req, res) => {
    const response = patientService.getOneEntry(req.params.id);
    res.send(response);
});

export default router;