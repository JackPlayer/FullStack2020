/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatientEntry, Gender, Entry } from './types';

const toNewPatient = (object: any): NewPatientEntry => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        occupation: parseOccupation(object.occupation),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        entries: parseEntries(object.entries),
    };
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

const parseEntries = (entries: any): Entry[] => {
    if (!entries) {
        throw new Error(`Incorred or missing entries: ${entries}`);
    }
    return entries;
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name: ${name}`);
    }

    return name;
};

const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing ssn: ${ssn}`);
    }

    return ssn;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect or missing occupation: ${occupation}`);
    }

    return occupation;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error(`Incorrect or missing date: ${dateOfBirth}`);
    }
    return dateOfBirth;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
  };

export default toNewPatient;
