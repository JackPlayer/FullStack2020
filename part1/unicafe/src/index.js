import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'


const Button = ({text, handler, amount}) => {
  const handleClick = () => {
    handler(amount + 1)
  }

  return (
    <>
      <button className="btn" onClick={handleClick}>{text}</button>
    </>
  )
}
const Stat = ({text, amount, percent}) => {
  if (percent) {
    return (
      <>
        <p><strong>{text}: </strong>{amount * 100} %</p>
      </>
    )
  }
  return (
    <>
      <p><strong>{text}: </strong>{amount}</p>
    </>
  )
}

const Statistics = ({stats}) => {
  const { good, bad, neutral } = stats
 
  
  const calcTotal = () => {
    return good + bad + neutral
  }

  const calcPositive = () => {
    return good / calcTotal()
  }
  
  const calcAverage = () => {
    if ( good === 0 && bad === 0 && neutral === 0) {
      return 0
    }
    let scores = []
    for (var i = 0; i < good; i++) {
      scores.push(1)
    } 

    for (let i = 0; i < bad; i++) {
      scores.push(-1)
    } 

    for (let i = 0; i < neutral; i++) {
      scores.push(0)
    } 
    
    const sum = scores.reduce((total, n) => total + n);
    return sum / scores.length;
  }
  return (
    <>
    <h1>Statistics</h1>
    <div id="stats">
      <Stat text="Good" amount={stats.good}/>
      <Stat text="Neutral" amount={stats.neutral}/>  
      <Stat text="Bad" amount={stats.bad}/>  
      <Stat text="All" amount={calcTotal()}/>
      <Stat text="Average" amount={calcAverage()}/>  
      <Stat text="Positive" amount={calcPositive()} percent={true}/>

    </div>
  </>
  )
 
}
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
      <Statistics stats={stats} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)