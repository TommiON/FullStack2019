import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [hyva, setHyva] = useState(0)
    const [neutraali, setNeutraali] = useState(0)
    const [huono, setHuono] = useState(0)

    const hyvaKlik = () => {
        setHyva(hyva+1)
    }
    const neutraaliKlik = () => {
        setNeutraali(neutraali+1)
    }
    const huonoKlik = () => {
        setHuono(huono+1)
    }

    return(
        <div>
          <h1>Anna palautetta</h1>
          <Button kasittelija={hyvaKlik} teksti='hyvä' />
          <Button kasittelija={neutraaliKlik} teksti='neutraali' />
          <Button kasittelija={huonoKlik} teksti='huono' />
          <h1>Statistiikka</h1>
          <Statistics hyvia={hyva} neutraaleja={neutraali} huonoja={huono} />     
        </div>
    )
}

const Button = ({ kasittelija, teksti }) => {
    return(<button onClick={kasittelija}>{teksti}</button>)
}

const Statistics = (props) => {
    if(props.hyvia == 0 && props.neutraaleja == 0 && props.huonoja == 0) {
        return(
            <div>
                <p>Ei yhtään palautetta annettu</p>
            </div>
        )
    } else return(
        <div>
            <table>
                <tbody>
                    
                <tr>
                    <td>hyvä</td><td><Statistic tyyppi='hyvät' hyvia={props.hyvia} neutraaleja={props.neutraaleja} huonoja={props.huonoja} /></td>
                </tr>
                <tr>
                    <td>neutraali</td><td><Statistic tyyppi='neutraalit' hyvia={props.hyvia} neutraaleja={props.neutraaleja} huonoja={props.huonoja} /></td>
                </tr>
                <tr>
                    <td>huono</td><td><Statistic tyyppi='huonot' hyvia={props.hyvia} neutraaleja={props.neutraaleja} huonoja={props.huonoja} /></td>
                </tr>
                <tr>
                    <td>yhteensä</td><td><Statistic tyyppi='yhteensä' hyvia={props.hyvia} neutraaleja={props.neutraaleja} huonoja={props.huonoja} /></td>
                </tr>
                <tr>
                    <td>keskiarvo</td><td><Statistic tyyppi='keskiarvo' hyvia={props.hyvia} neutraaleja={props.neutraaleja} huonoja={props.huonoja} /></td>
                </tr>
                <tr>
                    <td>positiivisia</td><td> <Statistic tyyppi='positiiviset' hyvia={props.hyvia} neutraaleja={props.neutraaleja} huonoja={props.huonoja} /></td>
                </tr>

                </tbody>
            </table>
        </div>
    )
}

const Statistic = (props) => {
    if(props.tyyppi == 'hyvät') {
        return (
            <p>{props.hyvia}</p>
        )
    }
    if(props.tyyppi == 'neutraalit') {
        return (
            <p>{props.neutraaleja}</p>
        )
    }
    if(props.tyyppi == 'huonot') {
        return (
            <p>{props.huonoja}</p>
        )
    }
    if(props.tyyppi == 'yhteensä') {
        return (
            <p>{props.hyvia + props.neutraaleja + props.huonoja}</p>
        )
    }
    // mieti tämä!
    if(props.tyyppi == 'keskiarvo') {
        return (
            <p>{(props.hyvia - props.huonoja) / (props.hyvia + props.neutraaleja + props.huonoja)}</p>
        )
    }
    if(props.tyyppi == 'positiiviset') {
        return (
            <p>{props.hyvia  / (props.hyvia + props.neutraaleja + props.huonoja) * 100} % </p>
        )
    }

}

ReactDOM.render(<App />, document.getElementById('root'));