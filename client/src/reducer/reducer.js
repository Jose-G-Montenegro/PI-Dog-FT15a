import { GET_BREEDS, GET_BYID, GET_BYNAME, GET_TEMPERAMENT} from '../actions/actions';

const initialState = {
    breeds: [],
    temperament: [],
    breedDetail: [],
    filterBreed: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_BREEDS: return {
            ...state,
            breeds: action.payload,
        }
        case GET_TEMPERAMENT: return {
            ...state,
            temperament: action.payload,
        }
        case GET_BYID: return {
            ...state,
            breedDetail: action.payload,
        }
        case GET_BYNAME: return {
            ...state,
            filterBreed: action.payload
        }
        default: return { ...state }
    }
}