import { useEffect, useState } from "react";

const KEY = "4d769817";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setLoading(true);
          setError(false);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found!");

          setMovies(data.Search);
          console.log(data);
        } catch (err) {
          setError(err.message); //errora ilettigimiz dize
        } finally {
          setLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return; // fetchmovies fonksiyonu cagrilmadan return diyoruz
      }
      fetchMovies();
    },
    [query]
  );

  return { movies, loading, error };
}
