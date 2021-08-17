import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import Paged from '../Paged/Paged';
import Dog from '../Dog/Dog';

import s from './SearchDogs.module.css'

export default function SearchDogs() {

    const filterByName = useSelector(state => state.filterByName)
    console.log(filterByName)

    const [currentPage, setCurrentPage] = useState(1); //pagina actual
    const breedsPerPage = 9; // razas por paginado
    const indexOfLastBreeds = currentPage * breedsPerPage; // indice (pos) de laultima raza raza
    const indexOfFirstBreeds = indexOfLastBreeds - breedsPerPage; // indice (pos) de la primera raza
    const currentBreeds = filterByName.slice(indexOfFirstBreeds, indexOfLastBreeds); //razas renderizando en la pag
    const paged = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div >
            <div
                className={s.paged}>
                <Paged breedsPerPage={breedsPerPage} breeds={filterByName.length} paged={paged} />
            </div>
            <div className={s.div}>{
                currentBreeds ? currentBreeds.map(breed => {
                    console.log(breed)
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
                    alert("raza no existente")
            }
            </div>
        </div>
        )}
