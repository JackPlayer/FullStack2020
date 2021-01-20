import React from 'react';
import {CoursePart} from '../types';

import Part from './Part'

interface ContentProps {
    courseParts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {

    const partMappedParts = courseParts.map((part) => <Part key={part.name} part={part}/>)
    
    return (
        <div id="content">
            {partMappedParts}
        </div>
    )
}

export default Content;