import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({ children }) {
  return (
    <>
      <nav className="navbar">
        <Logo />
        {children}
        <Favorites />
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

function Favorites({ numOfResult }) {
  return (
    <button className="heart">
      <HeartIcon className="icon"></HeartIcon>
      <span className="badge">2</span>
    </button>
  );
}
