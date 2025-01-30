import { useState } from 'react';

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatLine = ({ text, value }) => <div>{text} {value}</div>

const Stats = ({ goodScore, neutralScore, badScore }) => {
  const total = goodScore + neutralScore + badScore;
  if(total == 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  const avg =  total / 3;
  const positive = (goodScore / total) * 100;
  return (
    <div>
      <StatLine text="good" value={goodScore} />
      <StatLine text="neutral" value={neutralScore} />
      <StatLine text="bad" value={badScore} />
      <StatLine text="average" value={avg} />
      <div>positive {positive}% </div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" onClick={handleGoodClick}/>
      <Button text="neutral" onClick={handleNeutralClick} />
      <Button text="bad" onClick={handleBadClick} />
      <Header text="statistics" />
      <Stats goodScore={good} neutralScore={neutral} badScore={bad} />

    </div>
  )
}

export default App
