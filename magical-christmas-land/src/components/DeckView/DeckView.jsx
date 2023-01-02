import React from "react";
import styles from './DeckView.module.css';


const DeckView = () => {


  return (
    <div className={styles['wrapper-tile']}>
      <div className={styles['main-deck']}>
        <h1 className={styles.header}>Main Deck</h1>
      </div>
      <div className={styles['swaps']}>
        <h1 className={styles.header}>Sideboard</h1>
        {/* Add in Sideboard/Maybe Board */}
      </div>
      <div className={styles['reccomendations']}>
        <h1 className={styles.header}>Recs</h1>
        {/* This is going to be an advanced feature - query similar decks? maybe similar goals? */}
      </div>
    </div>
  )
}

export default DeckView;