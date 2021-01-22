import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Icon, SemanticICONS } from "semantic-ui-react";
import { useStateValue, setPatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import EntryList from '../Entries/EntryList';

const PatientPage: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const [{ patient }, dispatch] = useStateValue();
 
    useEffect(() => {
        if (patient !== undefined) {
            if (patient.id === id) return;
        }
        const fetchPatient = async () => {
            try {
                const {data: patientResponse} = await axios.get<Patient> (`${apiBaseUrl}/patients/${id}`);
                dispatch(setPatient(patientResponse));
            } catch (err) {
                console.log(err);
            }
        };
        fetchPatient();
    }, [id, dispatch, patient]);


    const getIconStringFromGender = (gender: string): SemanticICONS => {
        switch(gender) {
            case "male":
                return "man";
            case "female":
                return "woman";
            case "other": 
                return "other gender";
            default:
                return "question";
        }
    };

    const renderPatient = () => {
        if (patient === undefined) return;
        const genderIcon: SemanticICONS = getIconStringFromGender(patient.gender);

        return (
            <div id="patient-page">
                <Header as="h2">{patient.name} <Icon name={genderIcon}/></Header>
                <p><strong><Icon name="briefcase" /> Occupation:</strong> {patient.occupation}</p>
                <p><strong><Icon name="book" /> ssn:</strong> {patient.ssn}</p>
                <EntryList entries={patient.entries} />
            </div> 
        );
    };
    
    return (
        <>
         { patient && renderPatient()}
         { !patient && <Icon loading name='asterisk' /> }
        </>
    );
};

export default PatientPage;