const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = ({name, exercise}) => {
  return (
    <p>{name} {exercise}</p>
  )
}

const Content = ({ parts }) => {
  const createPart = (part) => <Part key={part.id} name={part.name} exercise={part.exercise}  />
  return (
    parts.map(createPart)
  );
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10
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
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App