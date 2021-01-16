/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';

const router = express.Router();
import patientsService from '../services/patientService'; 

router.get('/', (_req, res) => {
    res.send(patientsService.getEntries());
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    

    const newPatientEntry = patientsService.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
    });

    res.json(newPatientEntry);
});

export default router;