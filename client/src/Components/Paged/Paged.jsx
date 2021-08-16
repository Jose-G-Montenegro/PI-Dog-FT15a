import React from 'react';
import s from './Paged.module.css';

function Paged({ breedsPerPage, breeds, paged }) {
    const pageNumber = []; // numero de pagina

    for (let i = 1; i <= Math.ceil(breeds / breedsPerPage); i++) {// divido todas las razas por las razas por paginas
        pageNumber.push(i);
    }

    return (
        <nav >
            <ul className={s.ul}>
                {
                    pageNumber && pageNumber.map(num => (
                        <button key={num} className={s.btn} onClick={() => paged(num)} >{num}</button>// por cada numero de pagina creo un boton 
                    ))
                }
            </ul>
        </nav>
    )
}

export default Paged
