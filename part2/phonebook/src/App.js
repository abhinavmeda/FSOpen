import { useState, useEffect } from 'react'
import axios from 'axios'

const Heading = ({ heading }) => <h2>{heading}</h2>

const Person = ({ name, number}) => {
  return <div>{name} {number}</div>
}
const Display = ({ registrants }) => {
  return (
    <div>
      {registrants.map((person, i) => <Person key={i} name={person.name} number={person.number}/>)}
    </div>
  )
}

const Filter = ({ filter, set }) => {
  const handler = (event) => {
    set(event.target.value)
  }
  return (
    <div>
      filter by <input value={filter} onChange={handler}/>
    </div>
  )
  
}
const Form = ({registrants, setRegistrants}) => {
  
  const [formNameInput, setNameInput] = useState('')
  const [formNumberInput, setNumberInput] = useState('')

  const addRegistrants = (event) => {
    
    event.preventDefault()
    
    const exists = () => registrants.some(person => person.name === formNameInput || person.number === formNumberInput)
    
    if(formNameInput === '' || formNumberInput === ''){
      alert(`Need both name and phone number`)
      setNameInput('')
      setNumberInput('')
    }
    else{
      if(exists()){
        alert(`${formNameInput} or ${formNumberInput} already exists in the phonebook`)
        setNameInput('')
        setNumberInput('')
      }
      else{
        const newPerson = {
          name: formNameInput,
          number: formNumberInput
        }
        setRegistrants(registrants.concat(newPerson))
        setNameInput('')
        setNumberInput('')
      }
    } 
  }

  const handleNameInputState = (event) => setNameInput(event.target.value)
  const handleNumberInputState = (event) => setNumberInput(event.target.value)

  return (
    <>
    <form onSubmit={addRegistrants}>
        <div>
          name: <input value={formNameInput} onChange={handleNameInputState}/>
        </div>
        <div>
          number: <input value={formNumberInput} onChange={handleNumberInputState}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const App = () => {
  
  const [persons, setPersons] = useState([])
  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const [filter, setFilter] = useState('')
  return (
    <div>
      <Heading heading={"Phonebook"}/>
      <Filter filter={filter} set={setFilter}/>
      <Heading heading={"add a new"}/>
      <Form registrants={persons} setRegistrants={setPersons}/>
      <Heading heading={"Numbers"}/>
      <Display registrants={filter === '' ? persons : persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))}/>
    </div>
  )
}

export default App