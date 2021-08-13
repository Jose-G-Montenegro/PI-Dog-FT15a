import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';

import {getById} from '../../actions/actions';

function Detail() {
    const dispatch = useDispatch();

    const breed = useSelector(state => state.breedDetail);

    console.log(breed);

    const {id} = useParams();

    console.log(id)
    useEffect(() => {
        dispatch(getById(id));
    },[id]);

    return (
        <div>
            <h2>{breed.name}</h2>
            <img src={breed.image} alt="dog img"  width="200px" height='250px' />
            <h2>{breed.temperament?.map(el => el + " ")}</h2>
            <h2>{breed.height} cm</h2>
            <h2>{breed.weight} kg</h2>
            <h2>{breed.life_span}</h2>
        </div>
    )
}

export default Detail