import React from 'react';
import { Link } from 'react-router-dom';

import s from './Init.module.css'

export default function init() {
    return (
        <div className={s.all}>
            <h1>Welcome</h1>
            <Link to='/dog/home'>
                <button>Home</button>
            </Link>
        </div>
    )
}