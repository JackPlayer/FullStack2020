export interface Diagnosis {
    code: string,
    name: string,
    latin?: string,
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
}

export enum Gender {
    Other = "other",
    Male = "male", 
    Female = "female",
}

export type NewPatientEntry = Omit<Patient, 'id'>;
