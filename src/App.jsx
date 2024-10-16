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

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useState([]);
  // const [count, setCount] = useState(0);

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
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal }
        );
        setCharacters(data.results.slice(0, 5));
      } catch (error) {
        console.log(error.name);
        //fetch ==> error.name === "AbortError"
        //axios ==> axios.isCancel()

        // if(error.name !== "AbortError") {
        //   setCharacters([]);
        //   toast.error(error.response.data.error);
        // }

        // if (axios.isCancel()) {
        //   console.log("canell successfully!");
        // } else {
        //   setCharacters([]);
        //   toast.error(error.response.data.error);
        // }

        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    // if (query.length < 3) {
    //   setCharacters([]);
    //   return;
    // }

    fetchData();

    return () => {
      //controller
      controller.abort();
    };
  }, [query]);

  // useEffect(() => {
  //   const interval = setInterval(() => setCount((c) => c + 1), 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [count]);

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
      {/* <p style={{ color: "white" }}>{count}</p> */}
      <Toaster />
      <Navbar >
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favourites favourites={favourites} onDeleteFavourite={handleDeleteFavourite}/>
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
