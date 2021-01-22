

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    entries: Entry[];
    occupation: string;
}

export enum Gender {
    Other = "other",
    Male = "male", 
    Female = "female",
}

interface SickLeave {
    startDate: string, 
    endDate: string,
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    }
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry; 

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;


export type NewPatientEntry = Omit<Patient, 'id'>;
