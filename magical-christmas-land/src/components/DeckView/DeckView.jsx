import React, { useState } from "react";
import styles from './DeckView.module.css';
import Column from './Column'
import Card from './Card'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useEffect } from "react";

// TODO: Make this a custom hook
const getScryfallData = (cardList) => {
	const reqBody = cardList.map( inputName => ({ name : inputName }));
	console.log('check that body out', reqBody)
	return fetch('https://api.scryfall.com/cards/collection', {
		method: 'POST', 
  	headers: {
    'Content-Type': 'application/json',
  	},
  	body: JSON.stringify({identifiers: reqBody}),
	})
  .then((response) => response.json())
  .then((data) => { 
		return data
	});
}



const DeckView = (props) => {
	const [mainDeck, setMainDeck] = useState();

	useEffect(() => {
		const initData = [
			'lightning bolt',
			'spell pierce',
			'prismatic ending',
			'wrenn and six', 
			'leyline binding', 
			'persist',
			 'prismari command',
			 'teferi,time raveler',
			 'fable of the mirror breaker',
			 'indomitable creativity',
			 'archon of cruelty']

		getScryfallData(initData).then( r => setMainDeck(r.data))
	}, [])

	// DEBUGGING ONLY
	useEffect(()=>{
		console.log('main deck updated to: ', mainDeck)
	},[mainDeck])

	const cmcs = [ 'Land', 0, 1, 2, 3, 4 ]

	return (
		<div className={styles['wrapper-tile']}>
			<DndProvider backend={HTML5Backend}>
				<div className={styles['main-deck']}>
					<h1 className={styles.header}>Main Deck</h1>
					<div className={styles.wrapper}>
						{ cmcs.map( col => {
							const cards = [];
							cards.push(mainDeck?.filter( c => c.cmc === col )?.map( cardObj => <Card key={cardObj.name} name={cardObj.name}/>))
							if ( col === 4 ) {
								cards.push(mainDeck?.filter( c => c.cmc >= col )?.map( cardObj => <Card key={cardObj.name} name={cardObj.name}/>))
							}
							// console.log('currrrds' , cards)
							return (
								<Column key={`col_${col}`} title={typeof (col) == 'string' ? 'Lands' : col === 4 ? '4+ CMC Cards': `${col} CMC Cards`}>
									{cards}
								</Column>)
							})
						}
					</div>
					
				</div>
				<div className={styles['swaps']}>
					<h1 className={styles.header}>Sideboard</h1>
					{/* Add in Sideboard/Maybe Board */}
				</div>
				<div className={styles['reccomendations']}>
					<h1 className={styles.header}>Recs</h1>
					{/* This is going to be an advanced feature - query similar decks? maybe similar goals? */}
				</div>
			</DndProvider>
		</div>
	)
}

export default DeckView;