import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import Favourites from "./components/Favourites";
import RemoveFavourites from "./components/RemoveFavourites";

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");

  const getMovieReq = async (searchMovie) => {
    const API = `http://www.omdbapi.com/?s=${searchMovie}&apikey=87bf983`;
    const response = await fetch(API);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
  useEffect(() => {
    getMovieReq(searchMovie);
  }, [searchMovie]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("movie-favourites")
    );
    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("movie-favourites", JSON.stringify(items));
  };

  const addFavourite = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavourite = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
  };

  return (
    <div className="container-fluid movie">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Header searchMovie={searchMovie} setSearchMovie={setSearchMovie} />
      </div>
      <div className="row">
        <Home
          movies={movies}
          handleFavouritesClick={addFavourite}
          favouriteComponent={Favourites}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <h1>Favourites</h1>
      </div>
      <div className="row">
        <Home
          movies={favourites}
          handleFavouritesClick={removeFavourite}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
}

export default App;
