import axios from 'axios';

export const GET_BREEDS = 'GET_BREEDS';
export const GET_BYID = 'GET_BYID';
export const GET_BYNAME = 'GET_BYNAME';
export const GET_TEMPERAMENT = 'GET_TEMPERAMENT';
export const ORDER = 'ORDER';
export const FILTER_TEMPS = 'FILTER_TEMPS';
export const FILTER_CREATE = 'FILTER_CREATE';
export const PAGE = 'PAGE';

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
};

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
};

export function getByName(name) {
    return async function (dispatch) {
        try {
            let res = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            dispatch({
                type: GET_BYNAME,
                payload: res.data,
            })
        }
        catch (error) {
            console.log("not fount")
        }
    };
};

export function getTemperament() {
    return function (dispatch) {
        return axios.get('http://localhost:3001/temperament')
            .then((response) => {
                console.log(response.data)
                dispatch({
                    type: GET_TEMPERAMENT,
                    payload: response.data,
                })
            })
    }
};

export function sendDogs(dog) {
    return async function () {
        await axios.post('http://localhost:3001/dog', dog)
    }

};

export function filterTemps(payload) {
    return {
        type: FILTER_TEMPS,
        payload
    }
};

export function page(payload) {
    return {
        type: PAGE,
        payload
    }
};

export function filterCreate(payload) {
    return {
        type: FILTER_CREATE,
        payload
    }
};

export function order(payload) {
    return {
        type: ORDER,
        payload
    }
};