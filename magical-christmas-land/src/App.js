import ShowMeData from './helpers';

import logo from './logo.svg';
import './App.css';
import { queryHelpers } from '@testing-library/react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sup Dog</h1>
        <ShowMeData></ShowMeData>
      </header>
    </div>
  );
}

export default App;
