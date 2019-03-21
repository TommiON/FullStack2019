import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const parts = [
        {
            name:  'Reactin perusteet',
            exercises: 10
        },
        {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
        },
        {
            name: 'Komponenttien tila',
            exercises: 14
        }
    ]

    return(
        <div>
            <Header kurssi={course} />
            <Content osat={parts}  />
            <Total osat={parts} />
        </div>
    )
}

const Header = (props) => {
    return(
        <div>
            <h1>{props.kurssi}</h1>
        </div>
    )
}

const Content = (props) => {
    return(
        <div>
           <Part osa={props.osat[0]} />
           <Part osa={props.osat[1]} />
           <Part osa={props.osat[2]} />
        </div>
    )
}

const Part = (props) => {
    return(
        <div>
            <p>{props.osa.name} {props.osa.exercises}</p>
        </div>
    )
}

const Total = (props) => {
    return(
        <div>
            <p>Yhteensä {props.osat[0].exercises + props.osat[1].exercises + props.osat[2].exercises} tehtävää</p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));