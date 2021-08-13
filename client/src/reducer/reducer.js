import { FILTER_AZ, FILTER_TEMPS, FILTER_ZA, GET_BREEDS, GET_BYID, GET_BYNAME, GET_TEMPERAMENT } from '../actions/actions';

const initialState = {
    breeds: [],
    allBreeds: [],
    temperament: [],
    breedDetail: {},
    filterByName: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_BREEDS:
            return {
                ...state,
                breeds: action.payload,
                allBreeds: action.payload,
            }
        case GET_TEMPERAMENT:
            return {
                ...state,
                temperament: action.payload,
            }
        case GET_BYID:
            return {
                ...state,
                breedDetail: action.payload,
            }
        case GET_BYNAME:
            return {
                ...state,
                filterByName: action.payload
            }
        case FILTER_AZ:
            return {
                ...state,
                breeds: action.payload
            }
        case FILTER_ZA:
            return {
                ...state,
                breeds: action.payload
            }
        case FILTER_TEMPS:
            const allBreeds = state.allBreeds;
            //console.log(allBreeds.filter(el => el.temperament?.includes(action.payload)));
            const filterTemps = action.payload === 'all' ?
                allBreeds :
                allBreeds.filter(el => el.temperament?.includes(action.payload));
            // console.log(filterTemps)
            return {
                ...state,
                breeds: filterTemps
            }
        default: return { ...state }
    }
}