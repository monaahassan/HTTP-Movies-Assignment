
import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from './Movies/UpdateMovie';
import AddMovie from './Movies/addMovie';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [update, setUpdate] = useState(false);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [update]);

  return (
    <>
      <SavedList list={savedList} />
      <AddMovie update={update} setUpdate={setUpdate}/>

      <Route exact path="/">
        <MovieList update={update} setUpdate={setUpdate} movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie update={update} setUpdate={setUpdate} addToSavedList={addToSavedList} />
      </Route>

      <Route path='/update-movie/:id'>
        <UpdateMovie update={update} setUpdate={setUpdate}/>
      </Route>
    </>
  );
};

export default App;