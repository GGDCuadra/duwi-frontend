import { GET_ALL_MOVIES, GET_ALL_SERIES } from "./actions-types";

const initialState = {
    allMovies: [],
    allSeries: []
}

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_ALL_MOVIES:
            return {
                ...state,
                allMovies: payload
            }
        case GET_ALL_SERIES:
            return {
                ...state,
                allMovies: payload
            }
        default:
            break;
    }
}

export default reducer