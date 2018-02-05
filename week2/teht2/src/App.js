import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  handlePersonChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName
    }
  
    const persons = this.state.persons.concat(personObject)

    this.setState({
      persons,
      newName: ''
    })
  }

  render() {

    console.log(this.state.persons)
    return (
      <div>
        <h2>Puhelinluettelo</h2>       
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handlePersonChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map(person => <li key={person.name}>{person.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default App