import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dog from '../Dog/Dog';

import { getBreeds } from '../../actions/actions';//all Breeds

import s from './Dogs.module.css'
import Paged from '../Paged/Paged';

export default function Dogs() {
    // all breeds
    const dispatch = useDispatch();
    const breeds = useSelector(state => state.breeds);
    //console.log(breeds);
    useEffect(() => {
        dispatch(getBreeds());
    }, [dispatch]);

    // paginado
    const [currentPage, setCurrentPage] = useState(1); //pagina actual
    const breedsPerPage = 9; // razas por paginado
    const indexOfLastBreeds = currentPage * breedsPerPage; // indice (pos) de laultima raza raza
    const indexOfFirstBreeds = indexOfLastBreeds - breedsPerPage; // indice (pos) de la primera raza
    const currentBreeds = breeds.slice(indexOfFirstBreeds, indexOfLastBreeds); //razas renderizando en la pag
    const paged = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className={s.all}>
            <div className={s.paged}>
                <Paged breedsPerPage={breedsPerPage} breeds={breeds.length} paged={paged} />
            </div>
            <div className={s.div}>{
                currentBreeds && currentBreeds.map(breed => {
                    return <Dog
                        key={breed.id}
                        name={breed.name}
                        id={breed.id}
                        image={breed.image}
                        temperament={breed.temperaments}
                        // vw ancho - vh alto
                    />
                })
            }
            </div>
        </div>
    )
};