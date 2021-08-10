import React from 'react';

export default function Dog ({ name, id, image, heigth, weigth, temperaments, life_span}){
    return(
        <div>
            <h2>{name}</h2>
            <h2>{id}</h2>
            <img src={image} alt="dog img" />
            <h2>{heigth}</h2>
            <h2>{weigth}</h2>
            <h2>{temperaments}</h2>
            <h2>{life_span}</h2>
        </div>
    )
}