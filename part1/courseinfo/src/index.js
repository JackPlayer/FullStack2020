import React from 'react'
import ReactDOM from 'react-dom'


const Part = (props) => (
  <p>{props.partName} {props.exercises}</p>
)

const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
)

const Content = (props) => {

  return (
    <div>
      <Part partName={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part partName={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part partName={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
    
  );
}

const Total = (props) => {
  return (
    <>
     <p>Number of exercises {props.parts[0].exercises +props.parts[1].exercises  + props.parts[2].exercises }</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const parts = [part1, part2, part3]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts} />
      
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))