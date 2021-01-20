import React from 'react';
interface TotalProps {
    courseParts: Array<{name: string, exerciseCount: number}>
}


const Total: React.FC<TotalProps> = ({ courseParts }) => {

    const totalExercise = courseParts.reduce((total ,part) => total += part.exerciseCount, 0)
    
    return (
        <div id="total">
            <p>Total Exericse: {totalExercise}</p>
        </div>
    )
}

export default Total;