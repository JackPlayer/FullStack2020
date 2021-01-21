

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
export interface Entry {
    name?: string;
}
export enum Gender {
    Other = "other",
    Male = "male", 
    Female = "female",
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;


export type NewPatientEntry = Omit<Patient, 'id'>;
