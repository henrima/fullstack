import React from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
      <button onClick={props.onClick}>{props.text}</button>
  )

const Statistics = (props) => {
    const yhteensa = props.hyva + props.neutraali + props.huono
    const keskiarvo = (props.hyva - props.huono) / yhteensa
    const positiivisia = (props.hyva)/(props.hyva+props.neutraali+props.huono)*100

    return ( 
        <div>
            { props.hyva !== 0 && <Statistic text="hyva" value={props.hyva} /> }
            { props.neutraali !== 0 && <Statistic text="neutraali" value={props.neutraali} /> }
            { props.huono !== 0 && <Statistic text="huono" value={props.huono} /> }
            { isNaN(keskiarvo) === false && <p>keskiarvo {keskiarvo}</p> }
            { isNaN(positiivisia) === false && <p>positiivisia {positiivisia} %</p> }
            { yhteensa === 0 && <p> ei yhtään palautetta annettu </p> }
        </div> 
    )
}

const Statistic = (props) => (
    <tr>
      <td>{props.text} </td><td> {props.value}</td>
    </tr>
)

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0,
      }
    }
  
 
    asetaArvo = (state, value) => {
        return () => {
            this.setState({
                [state]: value,
            })
        }
    }    

    render() {
      return (
        <div>
          <div>
            <h1>anna palautetta</h1>
            <Button onClick={this.asetaArvo("hyva", this.state.hyva + 1)} text="hyvä"/>
            <Button onClick={this.asetaArvo("neutraali", this.state.neutraali + 1)} text="neutraali"/>
            <Button onClick={this.asetaArvo("huono", this.state.huono + 1)} text="huono"/>
            <h1>statistiikka</h1>
            <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} />
          </div>
        </div>
      )
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )