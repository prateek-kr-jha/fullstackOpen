const Header = (props) => {
    return <h1>{props.course}</h1>;
  };
  
  const Part = ({ name, exercises }) => {
    return (
      <p>
        {name} {exercises}
      </p>
    );
  };
  
  const Content = ({ parts }) => {
    const createPart = (part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    );
    return parts.map(createPart);
  };
  
  const Total = ({ parts }) => {
    const sum = parts.reduce(
      (currentSum, curr) => currentSum + curr.exercises,
      0
    );
  
    return <p>total of {sum} exercises</p>;
  };
  
  const Course = ({ course }) => {
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    );
  };

  export default Course;