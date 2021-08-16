import React from 'react';
import { Link } from 'react-router-dom';

import s from './Dog.module.css'

export default function Dog({ name, id, image, temperament }) {
    //console.log(temperament)
    return (
        <div className={s.all}>
            <Link to={`/dog/home/${id}`}>
                <h2 className={s.title}>{name}</h2>
            </Link>
            <img src={image} alt="dog img" className={s.img} />
            <h2 className={s.temp}>{temperament ?
                typeof temperament[0] === 'object' ?
                    temperament.map(el => ' *' + el.temperament + '* ') :
                    temperament.map(el => ' *' + el + '* ') :
                'sin temperamentos'} </h2>
        </div>
    )
}