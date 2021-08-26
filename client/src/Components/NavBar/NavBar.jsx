import React from "react";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTemperament, filterTemps, filterCreate, order } from '../../actions/actions'

import SearchBar from '../SearchBar/SearchBar';

import s from './NavBar.module.css'

export default function NavBar() {

    const dispatch = useDispatch();
    const temperament = useSelector(state => state.temperament);

    useEffect(() => {
        dispatch(getTemperament())
    }, [dispatch]);

    //FILTRADOS
    function filterByTemps(e) {
        // e = value del option = action.payload
        // console.log(e.target.value)
        dispatch(filterTemps(e.target.value))
    }
    function filterPerCreate(e) {
        //console.log(e.target.value)
        dispatch(filterCreate(e.target.value))
    }
    function orderPage(e) {
        console.log(e.target.value)
        dispatch(order(e.target.value))
    }
    return (
        <div className={s.all}>

            <div className={s.navBtn}>
                <div>
                    <Link to="/">
                        <h1>DOGS</h1>
                    </Link>
                </div>
                {/* <div>
                    <Link to='/'>
                        <button>Init</button>
                    </Link>
                </div> */}
                <div>
                    <Link to='/dog/home'>
                        <button className={s.button}>Home</button>
                    </Link>
                </div>
                <div>
                    <Link to='/dog/createDog'>
                        <button className={s.button}>Create you breed</button>
                    </Link>
                </div>
                <div>
                    <SearchBar />
                </div>
                <div>
                    <Link to='/dog/about'>
                        <button className={s.button}>About</button>
                    </Link>
                </div>
            </div>
            <div className={s.selectors}>
                <div>
                <h2>Filter by create</h2>
                <select className={s.ind} onChange={e => filterPerCreate(e)} >
                    <option value="all">All</option>
                    <option value="api">Api Dogs</option>
                    <option value="DB">Createds</option>
                </select>
                </div>
                <div>
                <h2> Order by</h2>
                <select className={s.ind} onChange={e => orderPage(e)} >
                    <option value="mas">+ Weigth</option>
                    <option value="menos">- Weigth</option>
                    <option value="a_z">A-Z</option>
                    <option value="z_a">Z-A</option>
                </select>
                </div>
                <div>
                    <h2>Filter by Temperament</h2>
                <select className={s.ind} onChange={e => filterByTemps(e)}>
                    <option value="all">All</option>
                    {temperament && temperament.map(el => <option key={el.id} value={el.temperament}>{el.temperament}</option>)}
                </select>
                </div>
            </div>
        </div>
    )
}