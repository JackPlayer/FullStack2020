import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'


const Button = ({text, handler, amount}) => {
  const handleClick = () => {
    handler(amount + 1)
  }
  return (
    <>
      <button class="btn" onClick={handleClick}>{text}</button>
    </>
  )
}
const Stat = ({text, amount}) => (
  <>
    <p><strong>{text}: </strong>{amount}</p>
  </>
)

const Statistics = ({good, bad, neutral}) => (
  <>
    <h1>Statistics</h1>
    <div id="stats">
      <Stat text="Good" amount={good}/>
      <Stat text="Neutral" amount={neutral}/>  
      <Stat text="Bad" amount={bad}/>  

    </div>
  </>
)
const Feedback = ({stats, handlers}) => {
  return (
    <>
      <h1>Give Feedback</h1>
      <div id="feedback-buttons">
        <Button text="Good" amount={stats.good} handler={handlers.setGood}/>
        <Button text="Neutral" amount={stats.neutral} handler={handlers.setNeutral}/>
        <Button text="Bad" amount={stats.bad} handler={handlers.setBad}/>
      </div>
    </>
    
  )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const stats = {
    good: good,
    neutral: neutral, 
    bad: bad
  }

  const handlers = {
    setGood: setGood,
    setNeutral: setNeutral,
    setBad: setBad
  }

  return (
    <div>
      <Feedback stats={stats} handlers={handlers}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)