import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import axios from "axios";

const EditMovieForm = (props) => {
    //hooks
    const {push} = useHistory();
    const {id} = useParams();
    const [movie, setMovie] = useState({
        id:'',
        title: "",
        director: "",
        genre: "",
        metascore: 0,
        description: ""
    });
    //state
    const {title, director, genre, metascore, description} = movie;
	//handlers
    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(movie, props);
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => props.setMovies(res.data))
            .catch(err => console.log(err))
    }
    console.log(id);
    //functions
	useEffect(() => {
		axios.get(`http://localhost:5000/api/movies/${id}`)
			.then(res => {
				console.log(res.data);
				setMovie({
                    id: res.data.id,
                    title: res.data.title,
                    director:res.data.director,
                    genre: res.data.genre,
                    metascore: res.data.metascore,
                    description: res.data.description
                })
			})
			.catch(err => {
				console.log(err);
			});
	}, []);
    //component
    return (
        <div className="col">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <h4 className="modal-title">Editing <strong>{movie.title}</strong>
                        </h4>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Title</label>
                            <input value={title} onChange={handleChange}
                                   name="title" type="text"
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Director</label>
                            <input value={director} onChange={handleChange}
                                   name="director" type="text"
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Genre</label>
                            <input value={genre} onChange={handleChange}
                                   name="genre" type="text"
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Metascore</label>
                            <input value={metascore} onChange={handleChange}
                                   name="metascore" type="number"
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea value={description}
                                      onChange={handleChange} name="description"
                                      className="form-control"></textarea>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <input type="submit" className="btn btn-info"
                               value="Save"/>
                        <Link to={`/movies/1`}><input type="button"
                                                      className="btn btn-default"
                                                      value="Cancel"/></Link>
                    </div>
                </form>
            </div>
        </div>);
}

export default EditMovieForm;