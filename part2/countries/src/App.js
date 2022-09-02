import { useState, useEffect } from "react"
import axios from "axios"

const Display = ({ countries }) => {
  if (countries.length === 0){
    return <div>No countries found</div>
  }
  if(countries.length === 1){
    const languages = countries[0].languages
    return (
      <div>
        <h1>{countries[0].name.common}</h1>
        <p>Capital: {countries[0].capital}</p>
        <p>Area: {countries[0].area}</p>
        <h3>Languages:</h3>
        <ul>
          // iterating through a js object
          // https://masteringjs.io/tutorials/fundamentals/iterate-object
          {Object.keys(languages).map(abbreviation => <li key={abbreviation}>{languages[abbreviation]}</li>)}
        </ul>
        <img src={countries[0].flags.png} alt={`flag of ${countries[0].name.common}`} width={200} height={200}/>
      </div>
    )
  }
  else if (1 < countries.length && countries.length <= 10){
    return (
      <div>
        {countries.map(country => <div key={country.name.common}>{country.name.common}</div>)}
      </div>
    )
  }
  else if(countries.length > 10){
    return (
      <div>Too many countries</div>
    )
  }
}
const Form = () => {
  const [input, setInput] = useState('')
  const [foundCountries, setFoundCountries] = useState([])

  const handler = (event) => {
    console.log(event.target.value)
    setInput(event.target.value)
  }
  // passing in "input" as a dependency means that this useEffect will fire everytime
  // "input" changes

  // https://daveceddia.com/useeffect-hook-examples/
  // If you want your effects to run less often, you can provide a second argument – an array of values. Think of them as the dependencies for that effect. If one of the dependencies has changed since the last time, the effect will run again. (It will also still run after the initial render)
  useEffect(() => {
    if(input.length > 0){
        axios
        .get(`https://restcountries.com/v3.1/name/${input}`)
        .then(response => {
            setFoundCountries(response.data)
        }).catch(() => {
          setFoundCountries([])
      })
    }
    else{
      setFoundCountries([])
    }
  }, [input])
  return (
    <>
    // https://bobbyhadz.com/blog/react-dont-submit-form-on-enter
    // event.preventDefault prevents a refresh of the page when user clicks enter
    <form onSubmit={(event) => {event.preventDefault()}}>
      find countries <input value={input} onChange={handler}/>
    </form>
    <Display countries={foundCountries}/>
    </>
  )
}
const App = () => {
  return (
    <Form/>
  )
}

export default App