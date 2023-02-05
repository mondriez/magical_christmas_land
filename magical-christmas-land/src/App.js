// import ShowMeData from './helpers';
import DeckView from './components/DeckView';
import DeckInput from './components/DeckInput';
import './App.css';

function App(props) {

  return (
    <div className="App">
      <header className="App-header">
        Indomidable Creativity
      </header>
      <DeckInput/>
      <DeckView />
    </div>
  );
}

export default App;
