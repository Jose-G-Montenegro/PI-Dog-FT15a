import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getById } from '../../actions/actions';

import s from './Detail.module.css'

function Detail() {
    const dispatch = useDispatch();

    const breed = useSelector(state => state.breedDetail);

    console.log(breed);

    const { id } = useParams();

    console.log(id)
    useEffect(() => {
        dispatch(getById(id));
    }, [id]);

    return (
        <div className={s.all}>
            <div className={s.card}>
                <h2>{breed.name}</h2>
                <img src={breed.image} alt="dog img" className={s.img} />
                <h2>{breed.temperament?.map(el => el + " ")}</h2>
                <h2>height: {breed.height} cm</h2>
                <h2>weight: {breed.weight} kg</h2>
                <h2>life_span: {breed.life_span}</h2>
            </div>
        </div>
    )
}

export default Detail