import patientsData from '../../data/patients.json';
import { Patient } from '../types';

const patients = patientsData as Array<Omit<Patient, "ssn">>;

const getEntries = (): Array<Omit<Patient, 'ssn'>> => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getEntries,
};