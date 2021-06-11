import React, {useEffect, useState} from "react";
//routing
import {Redirect, Route, Switch} from "react-router-dom";
//3rd party
import axios from 'axios';
//components
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import MovieHeader from './components/MovieHeader';
import FavoriteMovieList from './components/FavoriteMovieList';
import EditMovieForm from "./components/EditMovieForm";
//App component
const App = (props) => {
    const [movies, setMovies] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
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
    const deleteMovie = (id) => {
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
                        <Route path="/movies/edit/:id"
                               render={ rest => (
                                   <EditMovieForm {...rest} setMovies={setMovies} />
                               )}
                        />

                        <Route path="/movies/:id">
                            <Movie/>
                        </Route>

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

