import React from 'react';
import Header from './Header'
import Content from './Content'
import Total from './Total'

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header content={courseName} />
      <Content name={courseParts[0].name} count={courseParts[0].exerciseCount} />
      <Content name={courseParts[1].name} count={courseParts[1].exerciseCount} />
      <Content name= {courseParts[2].name} count={courseParts[2].exerciseCount} />
      <Total count={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

export default App;