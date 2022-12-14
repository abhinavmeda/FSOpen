import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return (
  
    <button onClick={onClick}>{text}</button>
  
  )
}
const Display = ({ title, selected, votes }) => {
  console.log(selected, votes)
    return (
    <div>
      <h1> {title} </h1>
      <div>{selected}</div>
      <div>has {votes} {votes === 1 ? "vote" : "votes"} </div>
    </div>
  )
  
}
const MostVoted = ({ allVotes, anecdotes }) => {
  const max = Math.max(...allVotes)
  if(max === 0){
    return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>Nothing has been voted for</p>
    </div>
    )
  }
  
  else{
    const index = [...allVotes].indexOf(max)
    return (
      <div>
        <Display title={"Anecdote with most votes"} selected={anecdotes[index]} votes={max}/>
      </div>
    )
    
  }
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0))

  const onClickHandler = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber)
  }
  const onClickVoteHandler = () => {
    const newState = [...votes]
    newState[selected] += 1
    setVotes(newState)
  }
  return (
    <div>
      
      <Display title={"Anecdote of the day"} selected={anecdotes[selected]} votes={votes[selected]}/>
      <Button onClick={onClickVoteHandler}text={"vote"}/>
      <Button onClick={onClickHandler} text={"next anecdote"}/>
      <MostVoted allVotes={votes} anecdotes={anecdotes}/>
    </div>
    
  )
}

export default App