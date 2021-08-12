import React from 'react';
import { Link } from 'react-router-dom';

import s from './Dog.module.css'

export default function Dog({ name, id, image, temperament }) {
    //console.log(temperament)
    return (
        <div className={s.all}>
            <Link to={`/dog/home/${id}`}>
                <h2>{name}</h2>
            </Link>
            <img src={image} alt="dog img" className={s.img} width="200px" height='250px' />
            <h2>{temperament?.map(el => el + " ")} </h2>
        </div>
    )
}