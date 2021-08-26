import React from 'react';
import { Link } from 'react-router-dom';


import s from './Init.module.css'

export default function init() {

    return (
        <div className={s.all}>
            <div className={s.container}>
                <h1 className={s.title}>¡¡¡Welcome!!!</h1>
                <Link to='/dog/home'>
                    <button className={s.btn}>Home</button>
                </Link>
            </div>
        </div>
    )
}
