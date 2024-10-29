import React from 'react'

export const Selector = (props) => {
  return (
        <select className="selctors">
       {props.options.map(item =><option value={item}>{item}</option>)}
        </select>
  )
}
