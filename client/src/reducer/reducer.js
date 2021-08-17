import { FILTER_CREATE, FILTER_TEMPS, GET_BREEDS, GET_BYID, GET_BYNAME, GET_TEMPERAMENT, ORDER } from '../actions/actions';

const initialState = {
    breeds: [],
    allBreeds: [],
    temperament: [],
    breedDetail: {},
    filterByName: [],
}
const promWeight = (n) => {
    let cor = n.split(' - ');
    if (cor !== 'NaN') {
        if (cor[0] !== 'NaN') {
            let sum = 0;
            cor.forEach(el => sum += el * 1)
            return Math.ceil(sum / 2)
        }
        else return cor[1]
    }
    else return 0
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
        case FILTER_TEMPS:
            const allBreeds = state.allBreeds;
            //console.log(allBreeds.filter(el => el.temperament?.includes(action.payload)));
            const filterTemps = action.payload === 'all' ?
                allBreeds :
                allBreeds.filter(el => el.temperaments?.includes(action.payload));
            // console.log(filterTemps)
            return {
                ...state,
                breeds: filterTemps
            }
        case FILTER_CREATE:
            const allDogs = state.allBreeds; // cambio el nombre de la const por que rompe
            const filterCreate = action.payload === 'DB' ?
                allDogs.filter(el => el.createInDB) : // todos los que tengan createInDB
                allDogs.filter(el => !el.createInDB); // todos los que no tengan createInDB
            // console.log(filterTemps)
            return {
                ...state,
                breeds: action.payload === 'all' ?
                    state.allBreeds :
                    filterCreate
            }
        case ORDER:
            let sortABC = action.payload === 'a_z' ?
                state.breeds.slice().sort(function (a, b) {
                    //console.log(a.name,b.name)
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.breeds.slice().sort(function (a, b) {
                    //console.log(a.name,b.name)
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                });
            let sortWeigth = action.payload === 'menos' ?
                state.breeds.slice().sort(function (a, b) {
                    console.log(a.weight, b.weight)
                    if (promWeight(a.weight) > promWeight(b.weight)) {
                        return 1;
                    }
                    if (promWeight(b.weight) > promWeight(a.weight)) {
                        return -1;
                    }
                    return 0;
                }) :
                state.breeds.slice().sort(function (a, b) {
                    if (promWeight(a.weight) > promWeight(b.weight)) {
                        return -1;
                    }
                    if (promWeight(b.weight) > promWeight(a.weight)) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                breeds: action.payload.includes('_') ?
                    sortABC :
                    sortWeigth
            }
        default: return { ...state }
    }
}