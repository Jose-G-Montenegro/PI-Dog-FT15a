import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getByName } from '../../actions/actions'

import s from './SearchBar.module.css';

function SearchBar() {
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')

    function onInputChange(e) {
        setSearch(e.target.value)
    }

    function handleSubmit() {
        if (search !== '') {
            dispatch(getByName(search));
            //console.log(search)
        } else {
            return alert('ingresa raza')
        }
    }
    return (
        <div>
            <div className={s.all} >
                <input
                className={s.input}
                    type="text"
                    placeholder="Search by name"
                    name="input"
                    onChange={(e) => onInputChange(e)}
                />
                <div>{search !== '' ?
                    <Link to='/dog/search'>
                        <button className={s.button} onClick={() => handleSubmit()}>
                            Search
                        </button>
                    </Link> :
                    <Link to='/dog/home'>
                        <button className={s.button} onClick={() => handleSubmit()}>
                            Search
                        </button>
                    </Link>}
                </div>
            </div>
        </div>
    )
}



export default SearchBar