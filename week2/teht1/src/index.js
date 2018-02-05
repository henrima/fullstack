import React from 'react'
import ReactDOM from 'react-dom'


const Kurssi = (props) => {
  return (
    <div>
      <Otsikko kurssi={props.kurssi} />
      <Sisalto osat={props.kurssi.osat} />
      <Yhteensa osat={props.kurssi.osat} />
    </div>
  )
}

const Osa = (props) => <li>{props.osa} {props.tehtavia}</li>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = (props) => {
  const osat = props.osat
  return(
    <div>
      <ul>
        {osat.map(osa => <Osa osa={osa.nimi} tehtavia={osa.tehtavia} />)}
      </ul>
    </div>
  )
}
const Yhteensa = (props) => {
  const [osa1, osa2, osa3] = props.osat
  
  return(
    <p>yhteensä {osa1.tehtavia + osa2.tehtavia + osa3.tehtavia} tehtävää</p>
  )
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id: 3
      },
      {
        nimi: 'Lisäosa: Jedin kosto',
        tehtavia: 42,
        id: 4
      }      
    ]
  }

  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)