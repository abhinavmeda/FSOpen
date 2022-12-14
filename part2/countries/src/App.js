import { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({ capitalName, data }) => {
  return (
    <div>
      <h2>Weather in {capitalName}</h2>
        <p>temperature {data.main.temp} celsius</p>
        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={"describing weather"}/>
        <p>wind {data.wind.speed} m/s</p>
    </div>
  )
}
const CountryView = ({ country }) => {
  const languages = country.languages
  console.log(languages)
  const [data, setData] = useState([])
  useEffect(() => {
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
    .then(response => setData(response.data))
    .catch(error => console.log(error))
  }, [country])
  

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
        <h3>Languages:</h3>
        <ul>
          {/* iterating through js object */}
          {/* https://masteringjs.io/tutorials/fundamentals/iterate-object */}
          {Object.keys(languages).map(abbreviation => <li key={abbreviation}>{languages[abbreviation]}</li>)}
        </ul>
        <img src={country.flags.png} alt={`flag of ${country.name.common}`} width={300} height={200}/>
        {data.length !== 0 ? <Weather capitalName={country.capital} data={data}/> : null}
      </div>
    )
    
}
const ShowCountryViewButton = ({ country }) => {
  const [click, setClick] = useState(false)
  const hide = () => setClick(false)
  const onClick = () => setClick(true)
  if (click){
    return <div> <CountryView country={country}/> <button onClick={hide}>hide</button></div>
  }
  return <button onClick={onClick}>show</button>
}
const Display = ({ countries }) => {
  if (countries.length === 0){
    return <div>No countries found</div>
  }
  if(countries.length === 1){
    return <CountryView country={countries[0]}/>
  }
  else if (1 < countries.length && countries.length <= 10){
    return (
      <div>
        {countries.map(country => <div key={country.name.common}>{country.name.common} <ShowCountryViewButton country={country}/></div>)}
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
    {/* event.preventDefault prevents a refresh of the page when user clicks enter */}
    {/* https://bobbyhadz.com/blog/react-dont-submit-form-on-enter */}
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