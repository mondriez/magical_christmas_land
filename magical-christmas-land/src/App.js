import ShowMeData from './helpers';
import DeckView from './components/DeckView';

import logo from './logo.svg';
import './App.css';
import { queryHelpers } from '@testing-library/react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DeckView></DeckView>
        <ShowMeData></ShowMeData>
      </header>
    </div>
  );
}

export default App;
