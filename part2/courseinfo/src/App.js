const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Course = ({ course }) => {
  
  const {id, name, parts} = course
  return (
    <div key={id}>
       <Header name={name}/>
      <Content content={parts}/>
    </div>
  )
  
}
const Part = ({ name, numberOfExercises}) => {
  return( 
    <div>{name} {numberOfExercises}</div>
  )
}
const Content = ({ content }) => {
  return(
    <div>
      {content.map(part => <Part key={part.id} name={part.name} numberOfExercises={part.exercises}/>)}
    </div>
  )
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  return (
    <Course course={course}/>
  )
}

export default App