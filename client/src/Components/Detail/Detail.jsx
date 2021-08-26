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
    }, [dispatch, id]);

    return (
        <div className={s.all}>
            <div className={s.card}>
                <div>
                    <img src={breed.image} alt="dog img" className={s.img} />
                </div>
                <div className={s.cont}>
                    <h2 className={s.name}>{breed.name}</h2>
                    <h2>{breed.temperaments ?
                        typeof breed.temperaments[0] === 'object' ? breed.temperaments.map(el => ' ' + el.temperament + ' ') : breed.temperaments.map(el => ' ' + el + ' ') : 'sin temperamentos'}</h2>
                    <h2>height: {breed.height} cm</h2>
                    <h2>weight: {breed.weight} kg</h2>
                    <h2>life_span: {breed.life_span}</h2>
                </div>
            </div>
        </div>
    )
}

export default Detail