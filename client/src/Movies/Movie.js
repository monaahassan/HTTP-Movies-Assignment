import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const {addToSavedList} = props;
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };
  
  function routeToUpdate() {
    history.push(`/update-movie/${params.id}`);
  }

  const saveMovie = () => {
    addToSavedList(movie);
  };

  function deleteMovie() {
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res=>{
        props.setUpdate(!props.update); 
        history.push('/')
      })
      .catch(err=>console.log(err));
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="button" onClick={routeToUpdate}>
        Edit
      </div>
      <div className="button" onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;