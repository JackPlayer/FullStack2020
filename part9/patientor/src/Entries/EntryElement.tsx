import React from 'react';
import { Entry } from '../types';

const EntryElement: React.FC<{entry: Entry}> = ({entry}) => {

    return (
        <>
            <p><strong>{entry.date}</strong>: {entry.description}</p>
            { entry.diagnosisCodes && <ul>{entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)}</ul>}
        </>
    );
};

export default EntryElement;