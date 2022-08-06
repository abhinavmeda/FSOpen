const Header = ({ name }) => {
    return <h1>{name}</h1>
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

  export default Course