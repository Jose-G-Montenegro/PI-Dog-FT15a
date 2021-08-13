import axios from 'axios';

export const GET_BREEDS = 'GET_BREEDS';
export const GET_BYID = 'GET_BYID';
export const GET_BYNAME = 'GET_BYNAME';
export const GET_TEMPERAMENT = 'GET_TEMPERAMENT';
export const FILTER_AZ = 'FILTER_AZ';
export const FILTER_ZA = 'FILTER_ZA';
export const FILTER_TEMPS = 'FILTER_TEMPS';


// aqui se conecta el Back y el Front
export function getBreeds() {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/dogs`)
            .then((response) => {
                dispatch({
                    type: GET_BREEDS,
                    payload: response.data,
                })
            })
    }
}

export function getById(id) {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/dogs/${id}`)
            .then((response) => {
                dispatch({
                    type: GET_BYID,
                    payload: response.data,
                })
            })
    }
}

export function getByName(name) {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/dogs?name=${name}`)
            .then((response) => {
                dispatch({
                    type: GET_BYNAME,
                    payload: response.data,
                })
            })
    }
};

export function getTemperament() {
    return function (dispatch) {
        return axios.get('http://localhost:3001/temperament')
            .then((response) => {
                dispatch({
                    type: GET_TEMPERAMENT,
                    payload: response.data,
                })
            })
    }
};

export function filterAZ(payload) {
    return {
        type: FILTER_AZ,
        payload
    }
}

export function filterZA(payload) {
    return {
        type: FILTER_ZA,
        payload
    }
}

export function filterTemps(payload) {
    return {
        type: FILTER_TEMPS,
        payload
    }
}