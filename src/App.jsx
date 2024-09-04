import "./App.css";
import Navbar from "./components/Navbar";
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import { allcharacters } from "../data/data";
import { useState } from "react";



export default function App() {
  const [characters, setCharacters] = useState(allcharacters);
  return (
    <div className="app">
      <Navbar numOfResult={characters.length} />
      <div className="main">
        <CharacterList characters={characters}/>
        <CharacterDetail/>
      </div>
    </div>
  );
}
