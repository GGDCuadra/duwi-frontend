import axios from 'axios'
import {
    GET_ALL_MOVIES,
    GET_ALL_MOVIES_FILTERED,
    GET_ALL_SERIES,
    GET_MOVIE_BY_TITLE,
    GET_TOP_MOVIES,
    GET_TOP_SERIES,
    GET_ALL_SERIES_FILTERED
} from './actions-types'

export const getAllEnabledMovies = (options) => {
    const{page, perPage} = options
    const endpoint = `http://localhost:3001/enabledMovies?page=${page}&perPage=${perPage}`
    return async dispatch => {
        try {
            const {data} = await axios.get(endpoint)
            console.log(data);
            dispatch({ 
                type: GET_ALL_MOVIES, 
                payload: data 
            })
        } catch (error) {
            console.log(error.message);
        }
    }
};

export const getMovieByTitle = (title) => {
    const endpoint = `http://localhost:3001/movies/title?title=${title}`
    return async dispatch => {
        try {
            const {data} = await axios.get(endpoint)
            console.log(data);
            dispatch({ 
                type: GET_MOVIE_BY_TITLE, 
                payload: data 
            })
        } catch (error) {
            console.log(error.message);
        }
    }
};

export const getTopMovies = () => {
    const endpoint = 'http://localhost:3001/top-movies'
    return async dispatch => {
        try {
            const {data} = await axios.get(endpoint)
            dispatch({ 
                type: GET_TOP_MOVIES, 
                payload: data 
            })
        } catch (error) {
            console.log(error.message);
        }
    }
};
export const getFilteredMovies = (filters) => {
    const endpoint = "http://localhost:3001/enabledMovies"
    return async dispatch => {
        try {
            const {data} = await axios.get(endpoint,{
                params: {
                    ...filters
                }
            })
            dispatch({
                type: GET_ALL_MOVIES_FILTERED,
                payload: data
            })
        } catch (error) {
            
        }
    }
}
export const getAllSeries = () => {
    const endpoint = 'http://localhost:3001/series';
    return async dispatch => {
        try {
            const {data} = await axios.get(endpoint)
            console.log(data);
            dispatch({ 
                type: GET_ALL_SERIES, 
                payload: data 
            })
        } catch (error) {
            console.log(error.message);
        }
    }
};

export const getSerieByTitle = (title) => {
    const endpoint = `http://localhost:3001/series/name?name=${title}`
    return async dispatch => {
        try {
            const {data} = await axios.get(endpoint)
            console.log(data);
            dispatch({ 
                type: GET_MOVIE_BY_TITLE, 
                payload: data 
            })
        } catch (error) {
            console.log(error.message);
        }
    }
};
export const getFilteredSeries = (filters) => {
    const endpoint = "http://localhost:3001/series"
    return async dispatch => {
        try {
            const {data} = await axios.get(endpoint,{
                params: {
                    ...filters
                }
            })
            console.log(data);
            dispatch({
            type: GET_ALL_SERIES_FILTERED,
                payload: data
            })
        } catch (error) {
            
        }
    }
}
export const getTopSeries = () => {
    const endpoint = 'http://localhost:3001/top-movies'
    return async dispatch => {
        try {
            const {data} = await axios.get(endpoint)
            dispatch({ 
                type: GET_TOP_SERIES, 
                payload: data 
            })
        } catch (error) {
            console.log(error.message);
        }
    }
};