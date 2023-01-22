import React from "react";
import { useDrop } from 'react-dnd'

import './Column.css'
import { useEffect } from "react";

const DropSlot = (props) => {
	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: 'card',
			drop: (item, monitor) => {
				console.log(" _________ ", item, monitor, `[${props.colIndex}, ${props.slotIndex}]`)
				props.acceptSplice(item, props.colIndex, props.slotIndex)
				return item
			},
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
				canDrop: !!monitor.canDrop(),
			})
		})
	)

	// Explore isOver interaction
	// useEffect(()=> {
	// 	if (isOver) console.log(' ^^^^^ Were OVER!', props.slotIndex)
	// 	else console.log (' >>>> We left', props.slotIndex)
	// },[isOver, props.slotIndex])

	// Attempt to dynamically pull dropslots to the front of page when hovering over
	const style = {
		zIndex: isOver ? 100 : 1,
	}

  return(
    <div key={props.slotIndex} style={style} className='drop-slot' ref={drop}>
			{props.children}
		</div>
  )
} 


const Column = (props) => {

	const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'card',
      drop: (item, monitor) => {
        console.log("******** ", item, monitor)
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
		<div className="card-column" >
      <h1>{props.title}</h1>
			<DropSlot key={`head_${props.index}`} slotIndex={-1} colIndex={props.index} acceptSplice={props.acceptSplice}/>
			{props.children.map( (kid, ki) => {
        return (
          <DropSlot key={ki} slotIndex={ki} colIndex={props.index} acceptSplice={props.acceptSplice}>
            {kid}
          </DropSlot>
        )})}
      <div className='drop-slot full-landing' ref={drop}/>
		</div>
	);
}

export default Column;