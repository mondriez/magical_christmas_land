import ShowMeData from './helpers';
import DeckView from './components/DeckView';
import ChessBoard from './components/ChessBoard'

import logo from './logo.svg';
import './App.css';
import { queryHelpers } from '@testing-library/react';

function App(props) {

  // require('react-dom');
  // window.React2 = require('react');
  // console.log(window.React1 === window.React2);

  return (
    <ChessBoard knightPosition={props.kp} />    
    // <div className="App">
    //   <header className="App-header">
    //     <DeckView />
    //     {/* <ShowMeData /> */}
    //   </header>
    // </div>
  );
}

export default App;
