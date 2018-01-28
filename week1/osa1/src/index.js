import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  )
}

const Sisalto = (props) => {
  return (
    <div>
      <Osa1 osa1={props.osa1} tehtavia1={props.tehtavia1} />
      <Osa2 osa2={props.osa2} tehtavia2={props.tehtavia2} />
      <Osa3 osa3={props.osa3} tehtavia3={props.tehtavia3} />
    </div>
  )
}

const Osa1 = (props) => {
  return (
    <div>
      <p>{props.osa1.nimi} {props.osa1.tehtavia}</p>
    </div>
  )
}

const Osa2 = (props) => {
  return (
    <div>
      <p>{props.osa2.nimi} {props.osa2.tehtavia}</p>
    </div>
  )
}

const Osa3 = (props) => {
  return (
    <div>
      <p>{props.osa3.nimi} {props.osa3.tehtavia}</p>
    </div>
  )
}

const Yhteensa = (props) => {
  const yhteensa = props.osa1.tehtavia + props.osa2.tehtavia + props.osa3.tehtavia
  return (
    <div>
      <p>yhteensa {yhteensa} tehtävää</p>
    </div>
  )
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  }

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osa1={osa1} osa2={osa2} osa3={osa3} />
      <Yhteensa osa1={osa1} osa2={osa2} osa3={osa3} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)