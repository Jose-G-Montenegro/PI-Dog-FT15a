import React from 'react';
import { useSelector } from 'react-redux';

import Dog from '../Dog/Dog';

import s from './SearchDogs.module.css'

export default function SearchDogs() {

    const filterByName = useSelector(state => state.filterByName)
    console.log(filterByName)

    return (
        <div className={s.div}>{
            filterByName && filterByName.map(breed => {
                return <Dog
                    key={breed.id}
                    name={breed.name}
                    id={breed.id}
                    image={breed.image}
                    height={breed.height}
                    weight={breed.weight}
                    temperament={breed.temperament}
                    life_span={breed.life_span}
                />
            })

        }
        </div>
    )
};