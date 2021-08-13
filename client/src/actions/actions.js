import axios from 'axios';

export const GET_BREEDS = 'GET_BREEDS';
export const GET_BYID = 'GET_BYID';
export const GET_BYNAME = 'GET_BYNAME';
export const GET_TEMPERAMENT = 'GET_TEMPERAMENT';

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