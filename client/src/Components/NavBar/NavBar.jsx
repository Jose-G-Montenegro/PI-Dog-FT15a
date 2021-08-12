import React from "react";
import { Link } from 'react-router-dom';

import SearchBar from '../SearchBar/SearchBar';

import s from './NavBar.module.css'

export default function NavBar() {


    return (
        <div>
            <div className={s.navBtn}>
                <div>
                    <h1>DOGS</h1>
                </div>
                <div>
                    <Link to='/'>
                        <button>Init</button>
                    </Link>
                </div>
                <div>
                    <Link to='/dog/home'>
                        <button>Home</button>
                    </Link>
                </div>
                <div>
                    <Link to='/dog/createDog'>
                        <button>Create you breed</button>
                    </Link>
                </div>
                <div>
                    <SearchBar />
                </div>
            </div>
            <div className={s.selectors}>
                <select className={s.selAll} >
                    <option value="tod">Todos</option>
                    <option value="exis">Existentes</option>
                    <option value="crea">Creados</option>
                </select>
                <select className={s.az}>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                </select>
                <select className={s.weigth} >
                    <option value="mas">+ Weigth</option>
                    <option value="menos">- Weigth</option>
                </select>
                <select className={s.temp}>
                    <option value="temp">Temperamentos</option>
                </select>
            </div>
        </div>
    )
}