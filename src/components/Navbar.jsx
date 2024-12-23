import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { useState } from "react";
import { Character } from "../components/CharacterList";

function Navbar({ children }) {
  return (
    <>
      <nav className="navbar">
        <Logo />
        {children}
      </nav>
    </>
  );
}

export default Navbar;

function Logo() {
  return <div className="navbar__logo">Rick And Morty 🎬</div>;
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="search..."
    />
  );
}

export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">Found {numOfResult} characters</div>;
}

export function Favourites({ favourites, onDeleteFavourite }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal title="Favourite characters" open={isOpen} onOpen={setIsOpen}>
        {favourites.map((item) => (
          <Character key={item.id} item={item}>
            <button
              className="icon red"
              onClick={() => onDeleteFavourite(item.id)}
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon"></HeartIcon>
        <span className="badge">{favourites.length}</span>
      </button>
    </>
  );
}


