import React from "react";
import { useDrop } from 'react-dnd'

import './Column.css'

const Column = (props) => {

	const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'card',
      drop: (item, monitor) => {
        console.log('<Col> recieved drop target:', item, props.key)
        props.acceptDrop(item, props.index)
        return item
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      })
    })
  )

	return (
		<div className="card-column" ref={drop}>
      <h1>{props.title}</h1>
			{props.children}
		</div>
	);
}

export default Column;