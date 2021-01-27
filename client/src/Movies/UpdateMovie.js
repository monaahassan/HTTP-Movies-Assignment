import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

function UpdateMovie(props) {
  const [state, setState] = useState({
    id: 0,
    title: "",
    director: "",
    metascore: 0,
    stars: [],
  });
  const history = useHistory();

  //set current movie to state
  let { id } = useParams();
  useEffect(()=> {
    axios.get(`http://localhost:5000/api/movies/${id}`)
    .then(res=> setState(res.data));
  }, []);
  
  //form field updates with state
  function changeHandler(e) {
    switch (e.target.name) {
      case "title":
        setState({...state, title: e.target.value});
        break;
      case "director":
        setState({...state, director: e.target.value});
        break;
      case "metascore":
        setState({...state, metascore: e.target.value});
        break;
      case "stars":
        setState({...state, stars: e.target.value});
        break;
      default: return state;
    } 
  }

  function putMovie(e) {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${id}`, state)
      .then(res => {
        props.setUpdate(!props.update);
        history.push('/');
      })
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={putMovie}>
      <label htmlFor="title">Title:</label>
      <input 
        type="text"
        name="title"
        id="title"
        value={state.title}
        onChange={changeHandler}
      />

      <label htmlFor="director">Director:</label>
      <input 
        type="text"
        name="director"
        id="director"
        value={state.director}
        onChange={changeHandler}
      />

      <label htmlFor="metascore">Metascore:</label>
      <input 
        type="text"
        name="metascore"
        id="metascore"
        value={state.metascore}
        onChange={changeHandler}
      />

      <label htmlFor="stars">Actors:</label>
      <input 
        type="text"
        name="stars"
        id="stars"
        value={state.stars}
        onChange={changeHandler}
      />

      <button>Submit</button>
    </form>
  ) 
}

export default UpdateMovie;