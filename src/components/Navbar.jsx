import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({numOfResult}) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO</div>
      <input type="text" className="text-field" placeholder="search..." />
      <div className="navbar__result">Found X characters</div>
      <button className="heart">
        <HeartIcon className="icon"></HeartIcon>
        <span className="badge">{numOfResult}</span>
      </button>
    </nav>
  );
}

export default Navbar;
