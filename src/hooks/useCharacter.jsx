import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";                       



export default function useCharacter (query)  {

      const [characters, setCharacters] = useState([]);
      const [isLoading, setIsLoading] = useState(false);

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

        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  return {isLoading , characters};
}