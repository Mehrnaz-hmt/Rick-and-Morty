import { useContext } from "react";
import { ThemeContext } from "../../App";
import { IoSunnyOutline } from "react-icons/io5";
import { AiFillMoon } from "react-icons/ai";

export default function ToggleDarkBTN() {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <button
      onClick={() => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
      }}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0",
      }}
    >
      {theme === "light" ? (
        <IoSunnyOutline style={{ color: "yellow", fontSize: "2.5em" }} />
      ) : (
        <AiFillMoon  style={{fill:"lightblue" ,color: "blue", fontSize: "2.5em" }} />
      )}
    </button>
  );
}
