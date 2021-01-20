import React from 'react';
interface ContentProps {
    courseParts: Array<{name: string, exerciseCount: number}>
}


const Content: React.FC<ContentProps> = ({ courseParts }) => {

    const paragraphMappedParts = courseParts.map((part) => <p key={part.name}>{part.name} {part.exerciseCount}</p>)
    
    return (
        <div id="content">
            {paragraphMappedParts}
        </div>
    )
}

export default Content;