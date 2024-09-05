import "./App.css";
import Navbar, { SearchResult } from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { allcharacters } from "../data/data";
import { useState } from "react";

export default function App() {
  const [characters, setCharacters] = useState(allcharacters);
  return (
    <div className="app">
      <Navbar numOfResult={characters.length}>
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <Main characters={characters}>
        <CharacterList characters={characters} />
        <CharacterDetail />
      </Main>
    </div>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}
