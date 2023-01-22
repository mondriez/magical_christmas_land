import React from "react";
import { DragPreviewImage, useDrag } from 'react-dnd'

const Card = (props) => {
  // Accept: Image SRC and number?

	const [{ isDragging }, drag, preview] = useDrag(() => ({
		type: 'card',
		item: {id: props.data.id, srcCol: props.srcCol},
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	}))

	const style = {
		width: '80%',
		aspectRatio: '196 / 273',
		backgroundColor: 'blue',
		opacity: isDragging ? 0.5 : 1,
		border: 'solid',
		borderWidth: '7px',
		borderRadius: '6px',
		margin: '3px auto'
	}

	return (
		<>
			{/* <DragPreviewImage connect={preview} src={FlappyStack} /> */}
			<div ref={drag} className="card-stack-wrapper" style={style}>
				<span>{props.data.name}</span>
			</div>
		</>
		
	)
}

export default Card;