import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import {Segment, Header} from 'semantic-ui-react'; 

const OccupationalHealthcareEntryElement: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
    
    let sickLeaveElement: JSX.Element | null = null;

    if (entry.sickLeave !== undefined) {
        sickLeaveElement = (
            <Segment>
                <Header as="h5">
                    Sick Leave
                </Header>
                <p><strong>Start: </strong>{entry.sickLeave.startDate}</p>
                <p><strong>Start: </strong>{entry.sickLeave.endDate}</p>
            </Segment>
        );
    }
    return (
        <div>
            <p><strong>Employer: </strong>{entry.employerName}</p>
            {sickLeaveElement}
        </div>
    );
};

export default OccupationalHealthcareEntryElement;