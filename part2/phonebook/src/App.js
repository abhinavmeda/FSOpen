import { useState } from 'react'

const Heading = ({ heading }) => <h2>{heading}</h2>

const Display = ({ registrants }) => {
  return (
    <div>
      {registrants.map((person, i) => <div key={i}>{person.name} {person.number}</div>)}
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

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