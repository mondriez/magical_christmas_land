import React, { useState, useEffect } from "react";
import styles from './DeckView.module.css';
import Column from './Column'
import Card from './Card'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'

// TODO: Make this a custom hook
const getScryfallData = (cardList) => {
	const reqBody = cardList.map( inputName => ({ name : inputName }));
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

	const sortCards = ( cards, mode='cmc' ) => {
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
		// LESSON: Pass f() to state setting when prevState needed to determine new state! (setState is async!)
		setMainDeck((prevState)=>{
			const tempMain = JSON.parse(JSON.stringify(prevState));
			const cardRow = tempMain[card.srcCol].findIndex(cardObj => cardObj.id === card.id);
			const poppedCard = tempMain[card.srcCol].splice(cardRow, 1);
			tempMain[pile].push(poppedCard[0])
			return tempMain
		})
	}

	const spliceCardToPosition = ( card, pi, si) => {
		// LESSON: Pass f() to state setting when prevState needed to determine new state! (setState is async!)
		setMainDeck((prevState)=>{
			const tempMain = JSON.parse(JSON.stringify(prevState));
			const poppedCard = tempMain[card.srcCol].splice(card.srcSlot, 1);
			tempMain[pi].splice(si + 1, 0, poppedCard[0]);
			return tempMain
		})
	}

	return (
		<div className={styles['wrapper-tile']}>
			<DndProvider backend={HTML5Backend}>
				<div className={styles['main-deck']}>
					<h1 className={styles.header}>Main Deck</h1>
					<div className={styles.wrapper}>
						{mainDeck && mainDeck.map( (col, colIndex) => {
							return (
							<Column 
								key={colIndex}
								title={`${colIndex} CMC`}
								index={colIndex}
								acceptDrop={moveCardToPile}
								acceptSplice={spliceCardToPosition}>
								{col.map((card, ci) => {
									return (
										<Card
											key={card.id}
											srcCol={colIndex}
											srcSlot={ci}
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