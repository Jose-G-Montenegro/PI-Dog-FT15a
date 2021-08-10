import React,{useState} from 'react';
import {useDispatch} from 'react-redux';

import {getByName} from '../../actions/actions'


function SearchBar() {
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')

    function onInputChange(e) {
        setSearch(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getByName(search));
        setSearch('');
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={search} onChange={onInputChange} />
                <input type="submit" value="search you dog" />
            </form>
        </div>
    )
}



export default SearchBar