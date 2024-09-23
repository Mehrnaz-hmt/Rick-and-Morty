import "./App.css";
import Navbar, { SearchResult } from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { useDebugValue, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Search } from "./components/Navbar";
import { Favourites } from "./components/Navbar";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useState([]);

  // handlers
  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavourite = (char) => {
      // setFavourites([...favourites,char]);  //Solution 1:
   setFavourites((prevFav) => [...prevFav,char]) //Solution 2:
  };

  const isAddToFavourites = favourites
    .map((fav) => fav.id)
    .includes(selectedId);

  //axios ==> async await
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`
        );
        setCharacters(data.results.slice(0, 5));
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    // if (query.length < 3) {
    //   setCharacters([]);
    //   return;
    // }

    fetchData();
  }, [query]);

  //Axios ... try ... catch ...
  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get("https://rickandmortyapi.com/api/character")
  //     .then(({ data }) => {
  //       setCharacters(data.results.slice(0, 5));
  //     })
  //     .catch((err) => {
  //       toast.error(err.response.data.error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  //solution with async await try...catch...finally
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch("https://rickandmortyapi.com/api/character");
  //       if (!res.ok) throw new Error("Something went wrong!");
  //       const data = await res.json();
  //       setCharacters(data.results.slice(0, 5));
  //       // setIsLoading(false);
  //     } catch (error) {
  //       // setIsLoading(false)
  //       // For Real Projects: err.response.data.message
  //       toast.error(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  //solution with then...catch...finally
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Something went wrong!!!");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       data.results.slice(0, 5);
  //     })
  //     .catch((err) => {
  //       toast.error(err.message);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // },[]);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favourites numOfFavourites={favourites.length} />
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
          setIsLoading={setIsLoading}
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
