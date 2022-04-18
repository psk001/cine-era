import React, { Component } from 'react';
import {getMovies } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService';
import Like from '../common/like';
import Pagination from '../common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from '../common/listGroup';

export default class Movie extends Component{
    
    state = {
        movieList: [],
        genres: [],
        pageSize: 4,
        currentPage:1,
        selectedGenre:""
    }

    componentDidMount(){
        const genres = [{name: "All Genres"},...getGenres()]
        this.setState({
            movieList: getMovies(), 
            genres: genres
        })
    }

    deleteMovie= (movie) => {
        const movies = this.state.movieList.filter(
            m => m._id !== movie._id
        )
        this.setState({movieList: movies})
    }

    handleLike = (movie) =>{        
        const movies = [...this.state.movieList]
        const index = movies.indexOf(movie)
        movies[index] = {...movies[index]}
        movies[index].liked = !movies[index].liked
        this.setState({movieList: movies})
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page})
    }

    handleNextPage = (page) => {
        this.setState({currentPage: page+1})
    }

    handlePreviousPage = (page) => {
        this.setState({currentPage: page-1})
    }    

    handleGenreSelect = (genre) => {
        this.setState({
            selectedGenre: genre,
            currentPage: 1
        })
    }

    render(){
    
        const {currentPage, pageSize, selectedGenre, movieList} = this.state  

        const filteredList = selectedGenre && selectedGenre._id  
            ? movieList.filter(m => m.genre._id == selectedGenre._id)
            : movieList

        const movies = paginate(filteredList, currentPage, pageSize)
        const count = filteredList.length

        if (count === 0){
            return <p>There are no movies in the store</p>
        } 

        return (
            <div className='row'>
                <h1 className="display-3"> Vidly </h1>   
                <h3> Movie Rental Service</h3>
                
                <div className="col-3">
                    <ListGroup 
                        items= {this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                <p>Showing {count} movies in the list </p>
                    <table className='table table-striped'> 
                        <thead>
                            <tr>
                                <th> Title </th> 
                                <th> Genre </th>
                                <th> Stock </th>
                                <th> Rate </th>
                                <th>  </th>
                                <th>  </th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map(
                                movie => (
                                    <tr key={movie._id}> 
                                        <td> {movie.title} </td>  
                                        <td> {movie.genre.name} </td>
                                        <td> {movie.numberInStock} </td>
                                        <td> {movie.dailyRentalRate} </td>
                                        <td> 
                                            <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />                                    </td>
                                        <td> <button onClick={() => this.deleteMovie(movie)} className='btn btn-danger'> Delete </button> </td>
                                    </tr>
                                )
                            )}
                        </tbody>    
                    </table>
                    <Pagination 
                        itemsCount={count} 
                        pageSize={pageSize} 
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                        onNextPage={this.handleNextPage}
                        onPreviousPage={this.handlePreviousPage}
                    />
                </div>

            </div >
        )
    }
}


