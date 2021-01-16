import express from 'express';

const router = express.Router();
import patientsService from '../services/patientService'; 

router.get('/', (_req, res) => {
    res.send(patientsService.getEntries());
});

export default router;