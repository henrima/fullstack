import React from 'react';
import Person from './components/Person'
import FilterPerson from './components/FilterPerson'
import personService from './services/person'
import Notification from './components/Notification'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newPhone: '',
      filterName: '',
      message: ''
    }
  }

  componentDidMount() {
    personService
    .getAll()
    .then(response => {
      this.setState({persons: response.data})
    })

  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
      this.setState({ newPhone: event.target.value })
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newPhone,
    }
  
  
    const dup = this.checkDuplicates()

    if (!dup) {
      personService
        .create(personObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newPhone: '',
            message: 'uusi käyttäjä lisätty'
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 5000)          
        })
    }
  }

  checkDuplicates = () => {
    return this.state.persons.find((p) => {
      return p.name === this.state.newName
    })
  }  

  render() {
    return (
      <div>
        {console.log(this.state.message)}
        <Notification message={this.state.message} />
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
          <Person persons={this.state.persons} delete={this.handleDeleteButton} />
        </ul>
      </div>
    )
  }
}

export default App
