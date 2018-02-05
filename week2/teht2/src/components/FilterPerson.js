import React from 'react'

const Person = (props) => {
    console.log(props)
    return (
        <div>
        rajaa näytettäviä: <input value={props.filterName} />
        </div> 
    )
  }

  export default Person

