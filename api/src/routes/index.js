const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db') // traigo los modelos de db.js para poder usarlos

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => { // traigo la info que necesito de la api
    const url = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const dogs = url.data.map(el => {
        return {
            name: el.name,
            id: el.id,
            height: el.height.metric,
            weight: el.weight.metric,
            temperaments: el.temperament && el.temperament.split(",").map(el => el.trim()),
            life_span: el.life_span,
            image: el.image.url,
        }
    });
    //dogs.map(el =>console.log(el.weight))
    return dogs
}

const getDBInfo = async () => { // trigo la info de la BdD
    return await Dog.findAll(
        { //await para esperar que busque, busca todo en el model Dog
            include: // incluyo el model Temperaments
                Temperament
        }
    );
};

const getAllInfo = async () => { // concateno en una funcion la llamada a la api y a la info
    const apiInfo = await getApiInfo();     //await para esperar la llamada
    const DBinfo = await getDBInfo();
    //console.log(DBinfo.temperaments)   //await para esperar la llamada
    const allInfo = apiInfo.concat(DBinfo);
    return allInfo
};

//ROUTING

router.get('/dogs', async (req, res) => {
    const name = req.query.name;
    let allDog = await getAllInfo(); // pido la info de la BdD y de la api 
    if (name) {// si existe un query
        let dogName = allDog.filter(el => el.name.toLowerCase().includes(name.toLowerCase())); // paso el name del llamado y el name del query a minuscula para poder compararlos
        dogName.length ? // consulto si existe algo en dogName - es un ternario
            res.status(200).send(dogName) :
            res.status(404).send('La raza de perro ingresada no existe');
    }
    else {
        res.status(200).send(allDog);
    }
})

router.get('/dogs/:idRaza', async (req, res) => {
    const id = req.params.idRaza  // busco por params
    //console.log(id);

    let allDog = await getAllInfo();
    //console.log(allDog)
    let dogName = allDog.filter(el => el.id == id); // le coloco == por que no son el mismo tipo de dato 
    dogName.length ? // consulto si existe dogName - es un ternario
        res.status(200).send(dogName[0]) :
        res.status(404).send('La raza de perro ingresada no existe');
})

router.get('/temperament', async (req, res) => {
    const temperaments = await Temperament.findAll(); // busco todo en la tabla temperaments
    res.send(temperaments)
})

router.post('/dog', async (req, res) => {
    const { name, height, weight, life_span, temperaments } = req.body;
    try {
        const raza = await Dog.create({
            name,
            height,
            weight,
            life_span,
            image: `https://1.bp.blogspot.com/-oBY2lZWjIDg/XqMU2oKTBiI/AAAAAAAAR9A/QD-GyOTS3TYSsitNaMFlAwS9TMYi_v0jgCLcBGAsYHQ/s1600/24.png`,
            createInDB: true,
        });
        let busc = await Temperament.findAll({
            where: {
                temperament: temperaments
            }
        })
        raza.setTemperaments(busc);


        res.send(busc);
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;
