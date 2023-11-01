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
    const endpoint = `/enabledMovies?page=${page}&perPage=${perPage}`
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
    const endpoint = `/movies/title?title=${title}`
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
    const endpoint = '/top-movies'
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
    const endpoint = "/enabledMovies"
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
    const endpoint = '/series';
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
    const endpoint = `/series/name?name=${title}`
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
    const endpoint = "/series"
    return async dispatch => {
        try {
            const {data} = await axios.get(endpoint,{
                params: {
                    ...filters
                }
            })
            dispatch({
            type: GET_ALL_SERIES_FILTERED,
                payload: data
            })
        } catch (error) {
            
        }
    }
}
export const getTopSeries = () => {
    const endpoint = '/top-series'
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
}

export const addFavorite = (item) => {
    const endpoint = ''
    return {
      type: 'ADD_FAVORITE',
      payload: item,
    };
  };
  
  export const removeFavorite = (item) => {
    return {
      type: 'REMOVE_FAVORITE',
      payload: item,
    };
  };