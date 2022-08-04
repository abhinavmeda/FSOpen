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
const Statistics = ({good, bad, neutral}) => {
  return(
    <div>
      <Data type={'good'} data={good}/>
      <Data type={'neutral'} data={bad}/>
      <Data type={'bad'} data={neutral}/>
    </div>
    
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  const incrementGood = () => {
    setGood(good + 1)
  }
  const incrementNeutral = () => {
    setNeutral(neutral + 1)
  }
  const incrementBad = () => {
    setBad( bad + 1)
  }
  return (
    <div>
      <Heading title={"give feedback"}/>
      <Button name={"good"} onClick={incrementGood}/>
      <Button name={"neutral"} onClick={incrementNeutral}/>
      <Button name={"bad"} onClick={incrementBad}/>
      <Heading title={"statistics"}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
    
  );
}

export default App;
