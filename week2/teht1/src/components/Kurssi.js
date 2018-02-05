import React from 'react'

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

  export default Kurssi