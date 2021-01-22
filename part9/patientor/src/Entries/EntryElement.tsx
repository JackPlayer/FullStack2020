import React from 'react';
import { Entry } from '../types';
import { useStateValue } from '../state';

const EntryElement: React.FC<{entry: Entry}> = ({entry}) => {
    const [{ diagnosis }, ] = useStateValue();

    return (
        <>
            <p><strong>{entry.date}</strong>: {entry.description}</p>
            { (entry.diagnosisCodes && diagnosis) && <ul>{entry.diagnosisCodes.map((code) => 
                <li key={code}>{code}: {diagnosis[code].name}</li>)}</ul>
            }
        </>
    );
};

export default EntryElement;