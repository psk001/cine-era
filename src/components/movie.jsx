import React, { Component } from 'react';
import {getMovies } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService';
import Pagination from '../common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from '../common/listGroup';
import MovieTable from './moviesTable';
import _ from 'lodash'
import { Link } from 'react-router-dom';

export default class Movie extends Component{
    
    state = {
        movieList: [],
        genres: [],
        pageSize: 4,
        currentPage:1,
        // selectedGenre:"",
        sortColumn: {path:'title', order:'asc'}
    }

    componentDidMount(){
        const genres = [{name: "All Genres"},...getGenres()]
        this.setState({
            movieList: getMovies(), 
            genres: genres
        })
    }

       handleDelete= (movie) => {
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

    handleSort = (sortColumn) => {
        this.setState({sortColumn})
    }

    getPagedData = () => {

        const {
            currentPage, 
            pageSize, 
            selectedGenre, 
            movieList, 
            sortColumn
        } = this.state         

        const filteredList = selectedGenre && selectedGenre._id  
            ? movieList.filter(m => m.genre._id === selectedGenre._id)
            : movieList

        const orderedList = _.orderBy(filteredList, [sortColumn.path], [sortColumn.order])
        const movies = paginate(orderedList, currentPage, pageSize)

        return {count: orderedList.length, movies: movies}
    }

    render(){

        const {
            currentPage, 
            pageSize,  
            sortColumn
        } = this.state         

        const {count, movies} = this.getPagedData()

        if (count===0){
            return <p>There are no movies in the store</p>
        } 

        return (
            <div className='row'>
                <h1 className="display-3"> CineEra </h1>   
                        
                <div className="col-3">
                    <ListGroup 
                        items= {this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                <p>Showing {count} movies in the list </p>
                    <Link 
                        to="/movies/new"
                        className="btn btn-primary"
                        style={{marginBottom: 20}}
                    >
                        New
                    </Link>
                    
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />

                    <MovieTable
                        movies={movies}
                        onLike={this.handleLike}
                         onDelete={this.handleDelete}   
                        onSort={sortColumn} 
                    />
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


