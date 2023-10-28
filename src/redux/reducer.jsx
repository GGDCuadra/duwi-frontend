import { GET_ALL_MOVIES, GET_ALL_MOVIES_FILTERED, GET_ALL_SERIES, GET_ALL_SERIES_FILTERED, GET_TOP_MOVIES, GET_TOP_SERIES } from "./actions-types";

const initialState = {
    allMovies: [],
    allSeries: [],
    topMovies: [],
    topSeries: [],
    allFavorites: []
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_MOVIES:
            return {
                ...state,
                allMovies: payload
            }
        case GET_ALL_SERIES:
            return {
                ...state,
                allSeries: payload
            }
        case GET_TOP_MOVIES:
            return {
                ...state,
                topMovies: payload
            }
        case GET_TOP_SERIES:
            return {
                ...state,
                topSeries: payload
            }
        case GET_ALL_MOVIES_FILTERED:
            return {
                ...state,
                allMovies: payload
            }
        case GET_ALL_SERIES_FILTERED:
            return {
                ...state,
                allSeries: payload
            }

        // case 'ADD_FAVORITE':
        //     return [...state, payload];
        // case 'REMOVE_FAVORITE':
        //     return state.filter((item) => item._id !== payload._id);
            default:
            return state;
    }
    
}

export default reducer;