import patientsData from '../../data/patients';
import { Patient, NewPatientEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';



const patients = patientsData;

const getEntries = (): Array<Omit<Patient, 'ssn'>> => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries: [],
    }));
};

const getEntry = (id: string): Patient | undefined => {
    const findPatient = patients.find((patient) => patient.id === id);

    if (!findPatient) throw new Error('Patient with that ID could not be found!');
    return findPatient;
};

const addPatient = (
    entry: NewPatientEntry,
    ):Patient => {
    
    const newPatient = {
        id: uuidv4(),
        ...entry
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    addPatient,
    getEntry,
};