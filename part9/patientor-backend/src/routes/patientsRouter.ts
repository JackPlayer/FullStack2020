/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();
import toNewPatient from '../utils';

router.get('/', (_req, res) => {
    res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
    try {
        res.send(patientService.getEntry(req.params.id));

    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatient(req.body);

        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

export default router;