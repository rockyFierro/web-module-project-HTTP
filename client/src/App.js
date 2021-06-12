import React, {useEffect, useState} from "react";
//routing
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
//3rd party
import axios from 'axios';
//components
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import MovieHeader from './components/MovieHeader';
import FavoriteMovieList from './components/FavoriteMovieList';
import EditMovieForm from "./components/EditMovieForm";
import AddMovieForm from "./components/AddMovieForm";
//App component
const App = (props) => {
    const [movies, setMovies] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const history = useHistory();

    //initial call out
    useEffect(() => {
        axios.get('http://localhost:5000/api/movies')
            .then(res => {
                setMovies(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
//handlers
    //delete
    const deleteMovie = (id) => { //why is this getting called on render?
        axios.delete(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log(res.data)
            })
            .then(() => {
                axios.get('http://localhost:5000/api/movies')
                    .then(res => {
                        setMovies(res.data);
                        history.push('/movies');
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
    //add
    const addToFavorites = (movie) => {

    }
//jsx - return component
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <span className="navbar-brand"><img width="40px" alt=""
                                                    src="./Lambda-Logo-Red.png"/> HTTP / CRUD Module Project</span>
            </nav>

            <div className="container">
                <MovieHeader/>
                <div className="row ">
                    <FavoriteMovieList favoriteMovies={favoriteMovies}/>

                    <Switch>
                        <Route
                            path="/add-movie"
                            render={rest => (
                                <AddMovieForm
                                    {...rest}
                                    setMovies={setMovies}
                                />
                            )}
                        />


                        <Route path="/movies/edit/:id"
                               render={rest => (
                                   <EditMovieForm {...rest}
                                                  setMovies={setMovies}/>
                               )}
                        />

                        <Route path="/movies/:id"
                               render={rest => (
                                   <Movie {...rest} deleteMovie={deleteMovie}/>
                               )}
                        />
                        <Route path="/movies">
                            <MovieList movies={movies}/>
                        </Route>

                        <Route path="/">
                            <Redirect to="/movies"/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};


export default App;

