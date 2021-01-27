import React, {useState} from 'react';
import axios from 'axios';

function AddMovie(props) {
  const [state, setState] = useState({
    id: 0,
    title: "",
    director: "",
    metascore: 0,
    stars: [],
  });

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
    const id = Date.now();
    let stars = state.stars.split(",")
    const movieObj = {
      ...state,
      id: id,
      stars: stars,
    }
    axios.post('http://localhost:5000/api/movies/', movieObj)
      .then(res => {
        console.log(res)
        props.setUpdate(!props.update);
      })
      .catch(err => console.log(err))
  }

  return(
    <form onSubmit={putMovie}>
      <h3>Add Movie:</h3>
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
      <button>
        Add Movie   
      </button>
    </form>
  )
}
 
export default AddMovie;