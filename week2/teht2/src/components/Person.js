import React from 'react'
import personService from '../services/person'

const Person = (props) => { 

  const handleDeleteButton = (person) => {
    return () => {
      if (window.confirm(`delete ${person.name} ?`)) {
        personService
          .destroy(person)
          .catch(() => {
            this.setNotification(`epic fails`)
          })
      }

      this.setState({
        persons: this.state.persons.filter((p) => p.id !== person.id)
      })
    }
  } 
    return (
      <div>
        <ul>
            {props.persons.map(person => 
            <li key={person.name}>
              {person.name} - {person.number}
              <form onSubmit={handleDeleteButton(person)} person={person}>
                <button type="submit">poista</button>
              </form>              
              </li>
            )}
        </ul>
      </div>
    )
  }


  export default Person