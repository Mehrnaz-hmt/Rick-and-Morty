import "./App.css";
import Navbar, { SearchResult } from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { useDebugValue, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Search } from "./components/Navbar";
import { Favourites } from "./components/Navbar";
import Modal from "./components/Modal";
import useCharacter from "./hooks/useCharacter";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacter(query);
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useLocalStorage("favourites",[]);
  // const [favourites, setFavourites] = useState(() => JSON.parse(localStorage.getItem("FAVOURITES")) || []);

  
  // handlers
  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavourite = (char) => {
    // setFavourites([...favourites,char]);  //Solution 1:
    setFavourites((prevFav) => [...prevFav, char]); //Solution 2:
  };

  const handleDeleteFavourite = (id) => {
    setFavourites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };

  const isAddToFavourites = favourites
    .map((fav) => fav.id)
    .includes(selectedId);

  //axios ==> async await

  // useEffect(() =>{
  //   localStorage.setItem("FAVOURITES",JSON.stringify(favourites))
  // },[favourites])

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favourites
          favourites={favourites}
          onDeleteFavourite={handleDeleteFavourite}
        />
      </Navbar>
      <Main characters={characters}>
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onSelectedCharacter={handleSelectCharacter}
          selectedId={selectedId}
        />
        <CharacterDetail
          onAddFavourite={handleAddFavourite}
          setIsLoading={isLoading}
          // useCharacter={useCharacter}
          selectedId={selectedId}
          isAddToFavourites={isAddToFavourites}
        />
      </Main>
    </div>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}
