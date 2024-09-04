import "./App.css";
import Navbar from "./components/Navbar";
import Characterlist from './components/Characterlist';
import CharacterDetail from './components/CharacterDetail';
import {characters} from "../data/data"

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <Characterlist characters={characters}/>
        <CharacterDetail/>
      </div>
    </div>
  );
}
