import { useState } from "react";

const Heading = ({ title }) => {
  return (
      <h1>
        {title}
      </h1>
  )
}
const Button = ({ name, onClick }) => {
  return (
      <button onClick={onClick}>{name}</button>
  )
}
const Data = ({type, data}) => {
  return (
    <div>
      {type} {data}
    </div>
  )
}
const Statistics = ({ good, bad, neutral, all, average, positive }) => {
  return(
    <div>
      <Data type={'good'} data={good}/>
      <Data type={'neutral'} data={neutral}/>
      <Data type={'bad'} data={bad}/>
      <Data type={'all'} data={all}/>
      <Data type={'average'} data={average}/>
      <Data type={'positive'} data={positive}/>
    </div>
    
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  let average = (good - bad) / all
  let positive = (good / all) * 100

  if (isNaN(average)){average = 0}
  if(isNaN(positive)){positive = 0}
  
  const incrementGood = () => setGood(good + 1)
  
  const incrementNeutral = () => setNeutral(neutral + 1)

  const incrementBad = () => setBad( bad + 1)

  return (
    <div>
      <Heading title={"give feedback"}/>
      <Button name={"good"} onClick={incrementGood}/>
      <Button name={"neutral"} onClick={incrementNeutral}/>
      <Button name={"bad"} onClick={incrementBad}/>
      <Heading title={"statistics"}/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive + ' %'}/>
    </div>
    
  );
}

export default App;
