import React from 'react'

const Person = (props) => {
    console.log(props)
    return (
      <div>
        <ul>
            {props.person.map(person => <li key={person.name}>{person.name} - {person.phone}</li>)}
        </ul>
      </div>
    )
  }

  export default Person