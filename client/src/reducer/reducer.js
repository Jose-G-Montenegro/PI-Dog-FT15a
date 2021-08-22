import { FILTER_CREATE, FILTER_TEMPS, GET_BREEDS, GET_BYID, GET_BYNAME, PAGE, GET_TEMPERAMENT, ORDER } from '../actions/actions';

const initialState = {
    breeds: [],
    page: 1,
    allBreeds: [],
    temperament: [],
    breedDetail: {},
    filterByName: [],
}
const promWeight = (n) => {
    if (n !== "NaN") {
        let cor = n.split(' - ');
        if (cor.length === 2) {
            if (cor[0] !== "NaN") {
                let sum = 0;
                cor.forEach(el => sum += el * 1)
                return Math.ceil(sum / 2)
            }
            else return cor[1]
        }
        else return cor[0]
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
                filterByName: action.payload,
                page: 1
            }

        case PAGE:
            return {
                ...state,
                page: action.payload
            }

        case FILTER_TEMPS:
            const allBreeds = state.allBreeds;
            //console.log(allBreeds);
            let filt = allBreeds.filter(e => {
                if (e.temperaments !== undefined) {
                    if (typeof e.temperaments[0] === 'string') {
                        return e.temperaments?.includes(action.payload)
                    }
                    let arr = e.temperaments?.map(e => e.temperament)
                    return arr.includes(action.payload)
                }
            })
            // console.log(filt)
            return {
                ...state,
                breeds: action.payload === 'all' ?
                    allBreeds :
                    filt,
                page: 1
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
                    filterCreate,
                page: 1
            }

        case ORDER:
            let ordAZ = state.breeds.slice().sort(function (a, b) {
                //console.log(a.name,b.name)
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            });
            let ordWei = state.breeds.slice().sort(function (a, b) {
                //console.log(a.weight, b.weight)
                if (promWeight(a.weight) > promWeight(b.weight)) {
                    return 1;
                }
                if (promWeight(b.weight) > promWeight(a.weight)) {
                    return -1;
                }
                return 0;
            });
            let sortABC = action.payload === 'a_z' ?
                ordAZ :
                ordAZ.reverse();
            let sortWeigth = action.payload === 'menos' ?
                ordWei :
                ordWei.reverse();
            return {
                ...state,
                breeds: action.payload.includes('_') ?
                    sortABC :
                    sortWeigth
            }
        default: return { ...state }
    }
}