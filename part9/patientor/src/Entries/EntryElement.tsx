import React from 'react';
import { Entry } from '../types';
import { Header, List, Icon, SemanticICONS } from 'semantic-ui-react';
import { useStateValue } from '../state';
import HealthCheckEntryElement from './HealthCheckEntryElement';
import HospitalEntryElement from './HospitalEntryElement';
import OccupationalHealthcareEntryElement from './OccupationalHealthcareEntryElement';

const EntryElement: React.FC<{entry: Entry}> = ({entry}) => {
    const [{ diagnosis }, ] = useStateValue();

    const getElementsFromType = (): {element: JSX.Element; icon: SemanticICONS} | null => {
        switch (entry.type) {
            case "HealthCheck":
                return {
                    element: <HealthCheckEntryElement entry={entry}/>,
                    icon: "heart"
                };
            case "Hospital":
                return {
                    element: <HospitalEntryElement entry={entry}/>,
                    icon: "hospital symbol"
                };

            case "OccupationalHealthcare":
                return {
                    element: <OccupationalHealthcareEntryElement entry={entry}/>,
                    icon: "clipboard list"
                };

            default: 
                return null;
        }
    };

    if (!diagnosis || entry === undefined ) {
        return <p>Failed to load elements</p>;
    }
 
    const entryType = getElementsFromType();

    const diagnosisListRender = entry.diagnosisCodes?.map((code) => (
        <List.Item key={code}>
            <List.Icon name="info circle" verticalAlign="middle" size="large"/>

            <List.Content>
                <List.Header>
                    {code}
                </List.Header>
                <List.Description>
                    {diagnosis[code] && diagnosis[code].name}
                </List.Description>
            </List.Content>
        </List.Item>
        
    ));
    return (
        <div className="entry">
            <Header as="h4">{entry.date} {entryType && <Icon name={entryType.icon} />}</Header>
            <p>{entry.description}</p>
            <List divided relaxed>
                {diagnosisListRender}
            </List>
            {entryType && entryType.element}

        </div>
    );
};

export default EntryElement;