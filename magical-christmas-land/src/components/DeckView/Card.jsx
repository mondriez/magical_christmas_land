import React from "react";
import { DragPreviewImage, useDrag } from 'react-dnd'
import './Card.css'

const Card = (props) => {
	// Accept: Image SRC and number?

	const [{ isDragging }, drag, preview] = useDrag(() => ({
		type: 'card',
		item: {id: props.data.id, srcCol: props.srcCol, srcSlot: props.srcSlot},
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	}))

	const wrapperStyle = {
		width: '95%',
		aspectRatio: '196 / 273',
		opacity: isDragging ? 0 : 1,
		margin: '0 auto -118% auto',
		borderRadius: '0.5em',
		overflow: 'hidden',
		display: 'flex'
	}

	const image = props.data.layout === 'normal' ?
		props.data.image_uris.normal :
		props.data.card_faces[0].image_uris.normal
	
	const previewImage = props.data.layout === 'normal' ?
	props.data.image_uris.small :
	props.data.card_faces[0].image_uris.small

	return (
		<>
			<DragPreviewImage connect={preview} src={previewImage} className='drag-preview'/>
			<div ref={drag} className="card-stack-wrapper" style={wrapperStyle}>
				{/* <span>{props.data.name}</span> */}
				<img 
					className="card-image" 
					src={image} 
					alt={props.data.name}
					style={{width: '100%'}}/>
			</div>
		</>
		
	)
}

export default Card;