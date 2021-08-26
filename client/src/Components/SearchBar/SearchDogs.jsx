import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Paged from '../Paged/Paged';
import Dog from '../Dog/Dog';
import { page } from '../../actions/actions';

import s from './SearchDogs.module.css'

export default function SearchDogs() {

    const dispatch = useDispatch()
    const nPage = useSelector(state => state.page)
    const filterByName = useSelector(state => state.filterByName)
    //console.log(filterByName)

    const breedsPerPage = 9; // razas por paginado
    const indexOfLastBreeds = nPage * breedsPerPage; // indice (pos) de laultima raza raza
    const indexOfFirstBreeds = indexOfLastBreeds - breedsPerPage; // indice (pos) de la primera raza
    const currentBreeds = filterByName.slice(indexOfFirstBreeds, indexOfLastBreeds); //razas renderizando en la pag
    const paged = (pageNumber) => {
        dispatch(page(pageNumber))
    }

    return (
        <div >
            <div
                className={s.paged}>
                <Paged breedsPerPage={breedsPerPage} breeds={filterByName.length} paged={paged} />
            </div>
            <div className={s.div}>{
                currentBreeds.length > 0 ? currentBreeds.map(breed => {
                    //console.log(breed)
                    return <Dog
                        key={breed.id}
                        name={breed.name}
                        id={breed.id}
                        image={breed.image}
                        height={breed.height}
                        weight={breed.weight}
                        temperament={breed.temperaments}
                        life_span={breed.life_span}
                    />
                }) :
                    <div>
                        <h2 className={s.txt}>The registered breed does not exist</h2>
                        <img className={s.img} src="https://c.tenor.com/kExMMCcDRJkAAAAC/take-your-dog-to-work-day-good-boy.gif" />
                    </div>
            }
            </div>
        </div>
    )
}
