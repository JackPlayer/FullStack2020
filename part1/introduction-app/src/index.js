import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => (
  <div>
    <p>Hello {props.name}, you are {props.age} years old today</p>
  </div>
);

const App = () => {
  console.log("Hello from the APP component")

  const date = new Date()
  const a = 30
  const b = 100
  return (
  <div>
    <Hello name="Jack" age={24}/>
    <p><strong>The Date is: </strong> {date.toString()}</p>
    <p>
      {a} plus {b} is {a + b}
      </p>
  </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
