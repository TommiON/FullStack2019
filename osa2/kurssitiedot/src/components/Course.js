import React from 'react'

const Header = props =>
  <h1>{props.course}</h1>

const Total = ({parts}) => {
    const harjoitukset = parts.map(osa => osa.exercises)
    const total = harjoitukset.reduce((yht, vuorossa) => yht + vuorossa)
    return <p>yhteensä {total} tehtävää</p>
}

const Part = props =>
  <p>{props.part.name} {props.part.exercises}</p>

const Content = props => (
    props.parts.map(osa => <Part key={osa.id} part={osa} />)
)

const Course = ({course}) => {
    return(
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course