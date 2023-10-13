import { GET_ALL_MOVIES, GET_ALL_SERIES, GET_TOP_MOVIES, GET_TOP_SERIES } from "./actions-types";

const initialState = {
    allMovies: [],
    allSeries: [],
    topMovies: [],
    topSeries: []
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
        default:
            return state;
    }
}

export default reducer;