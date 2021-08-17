const axios = require('axios');
const {Temperament} = require ("../db")
const { API_KEY } = process.env;

const getAllTemps = async () => {
    try {
        const url = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const dogs = url.data.map(el =>  el.temperament && el.temperament.split(",").map(el => el.trim()))
        let arr = [];
        //console.log(dogs)
        dogs.map(el => {
            if (el) {
                // console.log(el)
                arr = [...arr, ...el]
            }
        }); 
        arr = [...new Set(arr)].sort().map(el => {
            Temperament.findOrCreate({ // en la base de datos, en la tabla temperaments, creo cada uno de los teperamentos, si ya esta no lo agrega
                where: { temperament: el }
            })
        })
        // arr.map(el => {
        //         Temperaments.findOrCreate({ // en la base de datos, en la tabla temperaments, creo cada uno de los teperamentos, si ya esta no lo agrega
        //             where: { name: el }
        //         })
        //     })

        //console.log(arr.length)
    } catch (error) {
        console.log(error)
    }

};
module.exports={getAllTemps}