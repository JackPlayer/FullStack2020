import React from 'react';
import { Entry }from '../types';
import EntryElement from './EntryElement';

const EntryList: React.FC<{entries: Array<Entry>}> = ({entries}) => {
    return (
        <div id="entries">
            <h2>Entries</h2>
            {entries.map((entry) => <EntryElement key={entry.id} entry={entry} />)}
        </div>
    );
};

export default EntryList;