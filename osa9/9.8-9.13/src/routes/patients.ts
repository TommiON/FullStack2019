import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    const response = patientService.getEntries();
    res.send(response);
});

router.post('/', (req, res) => {
    const {name, dateOfBirth, ssn, gender, occupation} = req.body;
    const response = patientService.addEntry(
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    );
    res.send(response);
   
});

export default router;