import React from "react";
import { DragPreviewImage, useDrag } from 'react-dnd'

const Card = (props) => {
  // Accept: Image SRC and number?

	const [{ isDragging }, drag, preview] = useDrag(() => ({
		type: 'card',
		item: {id: props.data.id},
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	}))

	const style = {
		width: '95%',
		aspectRatio: '196 / 273',
		backgroundColor: 'blue',
		opacity: isDragging ? 0.5 : 1,
		margin: 'auto'
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