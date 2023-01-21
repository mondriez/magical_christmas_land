import React, { useState, useEffect } from "react";
import styles from './DeckView.module.css';
import Column from './Column'
import Card from './Card'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'

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
			'archon of cruelty',
			'scalding tarn',
			'arid mesa',
			'wooded foothills',
			'steam vents',
			'sacred foundry',
			'stomping ground',
			'blood crypt',
			'mountain',
			'dwarven mine',
			'jetmirs garden',
			'xanders lounge',
			'raugrin triome'
		]

		getScryfallData(initData).then( r => {
			setMainDeck(sortCards(r.data, 'cmc'))
		})
	}, [])

	const sortCards = ( cards, mode = 'cmc') => {
		// const tempCards = JSON.parse(JSON.stringify(cards));
		switch (mode) {
			case 'cmc':
				const cmcs = [ 0, 1, 2, 3, 4 ]
				const sortedCmcCards = cmcs.map( cmc => {
					if ( cmc === 4 ) {
						return cards.filter( card => card.cmc >= cmc )
					}
					return cards.filter( card => card.cmc === cmc )
				})
				return sortedCmcCards;
			default: 
				console.debug('Sorting mode not supported: ', mode)
				return cards
		}
	}
	// DEBUGGING ONLY
	useEffect(()=>{
		console.log('main deck updated to: ', mainDeck)
	},[mainDeck])

	const moveCardToPile = ( card, pile) => {
		console.log("Finally movin", card, pile)
		// const tempMain = JSON.parse(JSON.stringify(mainDeck));
		// This makes my 'sortCards' method revert to previous changes...
		// Need system for tagging cards to cols OR don't flatmap, just do a non-destructive iteration
		const flatCardArray = mainDeck.flatMap(x=>x)
		const movedCardIndex = flatCardArray.findIndex(cardObj => cardObj.id === card.id)
		const poppedCard = flatCardArray.splice(movedCardIndex, 1);
		const tempMain = sortCards(flatCardArray, 'cmc'); 
		tempMain[pile].push(poppedCard[0])
		setMainDeck(tempMain)
	}

	return (
		<div className={styles['wrapper-tile']}>
			<DndProvider backend={HTML5Backend}>
				<div className={styles['main-deck']}>
					<h1 className={styles.header}>Main Deck</h1>
					<div className={styles.wrapper}>
						{mainDeck && mainDeck.map( (col, index) => {
							return (
							<Column 
								key={index}
								title={`${index} CMC`}
								index={index}
								acceptDrop={moveCardToPile}>
								{col.map((card, ci) => {
									return (
										<Card
											key={card.id}
											data={card}/>
									)
								})}
							</Column>
						)})}
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