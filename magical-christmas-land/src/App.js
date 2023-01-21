import ShowMeData from './helpers';
import DeckView from './components/DeckView';
// import ChessBoard from './components/ChessBoard'

import logo from './logo.svg';
import './App.css';
import { queryHelpers } from '@testing-library/react';

function App(props) {

  return (
    // <ChessBoard knightPosition={props.kp} />    
    <div className="App">
      <header className="App-header">
        Indomidable Creativity
      </header>
      <DeckView />
    </div>
  );
}

export default App;
