import React from 'react';
import { CoursePart } from '../types';

interface Partpart {
    part: CoursePart,
}

const Part: React.FC<Partpart> = ({part}) => {
    /**
        * Helper function for exhaustive type checking
    */
    const assertNever = (value: never): never => {
        throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    const getRenderFromName = () => {
        switch (part.name) {
            case "Fundamentals": 
                return (
                    <>
                        <p>Description: {part.description}</p>
                    </>
                 );
            case "Using props to pass data":
                return (
                    <>
                        <p>Project Count: {part.groupProjectCount}</p>
                    </>
                 ); 
            case "Deeper type usage":
                return (
                    <>
                        <p>Exercise Submission Link : {part.exerciseSubmissionLink}</p>
                        <p>Description: {part.description}</p>
                    </>
                )
            case "Advanced Typescript":
                return (
                    <> 
                        <p>Description: {part.description}</p>
                    </>
                )
            default: 
                return assertNever(part);
        }
    }

    const partStyle = {padding: "1rem", backgroundColor: "salmon", margin: "1rem"};
    const defaultRender = (
        <>
            <p>Name: {part.name}</p>
            <p>Exercise Count: {part.exerciseCount}</p>
        </>
    );
    
    const contextRender = getRenderFromName()

    return (
        <div style={partStyle}>
            {defaultRender}
            {contextRender}
        </div>
    )
}

export default Part;