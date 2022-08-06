import { useState } from 'react'

const Heading = ({ heading }) => <h2>{heading}</h2>

const Display = ({ registrants }) => {
  return (
    <div>
      {registrants.map((person, i) => <div key={i}>{person.name}</div>)}
    </div>
  )
}

const Form = ({registrants, setRegistrants}) => {
  
  const [formNameInput, setNameInput] = useState('')

  const addRegistrants = (event) => {
    event.preventDefault()
    const newPerson = {
      name: formNameInput
    }
    
    setRegistrants(registrants.concat(newPerson))
    setNameInput('')
  }

  const handleInputState = (event) => setNameInput(event.target.value)
  
  return (
    <>
    <form onSubmit={addRegistrants}>
        <div>
          name: <input value={formNameInput} onChange={handleInputState}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  return (
    <div>
      <Heading heading={"Phonebook"}/>
      <Form registrants={persons} setRegistrants={setPersons}/>
      <Heading heading={"Numbers"}/>
      <Display registrants={persons}/>
    </div>
  )
}

export default App