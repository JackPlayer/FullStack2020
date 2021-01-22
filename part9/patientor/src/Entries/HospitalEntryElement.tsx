import React from 'react';
import { HospitalEntry } from '../types';
import { Header, Segment } from 'semantic-ui-react';

const HospitalEntryElement: React.FC<{entry: HospitalEntry}> = ({entry}) => {
    return (
        <>
            <Segment>
                <Header as="h5">Discharge</Header>
                <p><strong>Date: </strong>{entry.discharge.date}</p>
                <p><strong>Criteria: </strong>{entry.discharge.criteria}</p>
            </Segment>
        </>
    );
};

export default HospitalEntryElement;