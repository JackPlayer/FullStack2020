import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
   
    const exercises = course.parts.map((e) => e.exercises)
    const total = exercises.reduce((prev, curr) => prev + curr)
    
    return(
      <p>Number of exercises {total}</p>
    ) 
  }
  
  const Part = ({part}) => {
    
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
  
    return (
      <div>
        {
          course.parts.map((element) => {
            return (
              <Part key={element.id} part={element}/>
            )
          })
        }
      </div>
    )
  }


const Course = ({course}) => {
    return (
      <>
        <Header course = {course} />
        <Content course = {course} />
        <Total course = {course} />
      </>
    )
  }

export default Course