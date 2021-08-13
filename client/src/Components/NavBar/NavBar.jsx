import React from "react";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTemperament, filterTemps } from '../../actions/actions'

import SearchBar from '../SearchBar/SearchBar';

import s from './NavBar.module.css'

export default function NavBar() {

    const dispatch = useDispatch();
    const temperament = useSelector(state => state.temperament);

    useEffect(() => {
        dispatch(getTemperament())
    }, [dispatch]);

    function filterByTemps(e) {
        console.log(e.target.value)
        dispatch(filterTemps(e.target.value))
    }

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
                    <option value="mas">+ Weigth</option>
                    <option value="menos">- Weigth</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                </select>
                <select className={s.temp} onChange={e => filterByTemps(e)}>
                    <option value="all">All</option>
                    {temperament && temperament.map(el => <option key={el.id} value={el.name}>{el.name}</option>)}
                </select>
            </div>
        </div>
    )
}