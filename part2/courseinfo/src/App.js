const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Course = ({ course }) => {  
  const { name, parts} = course
  return (
    <div>
       <Header name={name}/>
      <Content content={parts}/>
      <TotalExercises exercisesCount={parts.map(part => part.exercises)}/>
    </div>
  )
}

const TotalExercises = ({ exercisesCount }) => {
  const total = exercisesCount.reduce((sumSoFar, currentElement) => sumSoFar + currentElement, 0)
  return (
    <div>
      <p> <strong>a total of {total} {total === 1? "exercise" : "exercises"}</strong></p>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
    
  )
}

export default App
