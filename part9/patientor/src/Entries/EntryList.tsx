import React from 'react';
import { Entry }from '../types';
import { Segment } from 'semantic-ui-react';
import EntryElement from './EntryElement';

const EntryList: React.FC<{entries: Array<Entry>}> = ({entries}) => {
    return (
        <div id="entries">
            <h2>Entries</h2>
            {entries.map((entry) =>
                <Segment key={entry.id}>
                    <EntryElement entry={entry} />
                </Segment> 
            )}

        </div>
    );
};

export default EntryList;