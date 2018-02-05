import React from 'react'
import ReactDOM from 'react-dom'


const Kurssi = (props) => {
  return (
    <div>
      <Otsikko key={props.kurssi.id} kurssi={props.kurssi} />
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
        {osat.map(osa => <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />)}
      </ul>
    </div>
  )
}
const Yhteensa = (props) => {
  const osat = props.osat
  const maara = osat.reduce((summa, osa) => summa + osa.tehtavia, 0)
  
  return(
    <p>yhteensä {maara} tehtävää</p>
  )
}

const App = () => {
  const kurssit= [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
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
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]
  

  return (
    <div>
      <h1>Opetusohjelma</h1>
      {kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />)}
    </div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)