import React from 'react';
import { Link } from 'react-router-dom';

export default function init() {
    return (
        <div>
            <h1>Welcome</h1>
            <Link to='/dog/home'>
                <button>Home</button>
            </Link>
        </div>
    )
}