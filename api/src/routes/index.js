const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const { Dog, Temperaments } = require('../db') // traigo los modelos de db.js para poder usarlos

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => { // traigo la info que necesito de la api
    const url = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const dogs = await url.data.map(el => {
        return {
            name: el.name,
            height: el.height.metric,
            weight: el.weight.metric,
            temperament: el.temperament,
            life_span: el.life_span,
        }
    });
    return dogs
}

const getDBInfo = async () => { // trigo la info de la BdD
    return await Dog.findAll({ //await para esperar que busque, busca todo en el model Dog
        includes: { // inclui el model Temperaments, especificamente el atributo name
            model: Temperaments,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
};

const getAllInfo = async () => { // concateno en una funcion la llamada a la api y a la info
    const apiInfo = await getApiInfo();     //await para esperar la llamada
    const DBinfo = await getDBInfo();    //await para esperar la llamada
    const allInfo = apiInfo.concat(DBinfo);
    return allInfo
};

const getAllTemps = async () =>{
    const url = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const temp = await url.data.map(el => el.temperament ? el.temperament.split(", "): undefined); // algunos llegan undefined, por eso el ternario
    console.log(temp)
    return temp 
};

//ROUTING

router.get('/dogs', async (req, res) => {
    const name = req.query.name;
    let allDog = await getAllInfo(); // pido la info de la BdD y de la api 
    if (name) {// si existe un query
        let dogName = allDog.filter(el => el.name.toLowerCase().includes(name.toLowerCase())); // paso el name del llamado y el name del query a minuscula para poder compararlos
        dogName.length ? // consulto si existe dogName - es un ternario
            res.status(200).send(dogName) :
            res.status(400).send('La raza de perro ingresada no existe');
    }
    else {
        res.status(200).send(allDog);
    }
})

router.get('/dogs/:idRaza', async (req, res) => {
    const name = req.params.idRaza  // busco por params
    console.log(name);

    let allDog = await getAllInfo();
    let dogName = allDog.filter(el => el.name.toLowerCase().includes(name.toLowerCase())); // paso el name del llamado y el name del query a minuscula para poder compararlos
    dogName.length ? // consulto si existe dogName - es un ternario
        res.status(200).send(dogName) :
        res.status(400).send('La raza de perro ingresada no existe');
})

router.get('/temperament', async (req, res) => {
    getAllTemps();
    res.status(200).json(getAllTemps())
})

router.post('/dog', async (req, res) => {

})
module.exports = router;
