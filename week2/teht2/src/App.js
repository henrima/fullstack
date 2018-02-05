import React from 'react';
import Person from './components/Person'
import FilterPerson from './components/FilterPerson'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas',
          phone: '1337'
        }
      ],
      newName: '',
      newPhone: '',
      filterName: ''
    }
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
      console.log(event.target.value)
      this.setState({ newPhone: event.target.value })
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      phone: this.state.newPhone
    }
  
    const dup = this.checkDuplicates()

    if (!dup) {
      const persons = this.state.persons.concat(personObject)

      this.setState({
        persons,
        newName: '',
        newPhone: ''
      })
    }
  }

  checkDuplicates = () => {
    return this.state.persons.find((p) => {
      return p.name === this.state.newName
    })
  }  

  render() {

    console.log(this.state.persons)
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <FilterPerson filter={this.state.filterName} />
        <form onSubmit={this.addPerson}>
            <div>
                nimi: <input value={this.state.newName} onChange={this.handleNameChange} />
            </div>
            <div>
                numero: <input value={this.state.newPhone} onChange={this.handleNumberChange} />
            </div>          
            <div>
                 <button type="submit">lisää</button>
            </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          <Person person={this.state.persons} />
        </ul>
      </div>
    )
  }
}

export default App
