import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';

import {getById} from '../../actions/actions';

function Detail() {
    const dispatch = useDispatch();
    const breedDetail = useSelector(state => state.breedDetail);
    console.log(breedDetail);
    const {id} = useParams();

    useEffect(() => {
        dispatch(getById(id));
    }, [id]);

    return (
        <div>
            <h2>{breedDetail[0].name}</h2>
            <img src={breedDetail[0].image} alt="dog img"  width="200px" height='250px' />
            <h2>{breedDetail[0].temperament?.map(el => el + " ")}</h2>
            <h2>{breedDetail[0].height} cm</h2>
            <h2>{breedDetail[0].weight} kg</h2>
            <h2>{breedDetail[0].life_span} years</h2>
        </div>
    )
}

export default Detail
