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
            include: // incluyo el model Temperaments, especificamente el atributo name
                Temperament
        }
    );
};

const getAllInfo = async () => { // concateno en una funcion la llamada a la api y a la info
    const apiInfo = await getApiInfo();     //await para esperar la llamada
    const DBinfo = await getDBInfo();
    console.log(DBinfo.temperaments)   //await para esperar la llamada
    const allInfo = apiInfo.concat(DBinfo);
    return allInfo
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
    else if (name === undefined) {
        res.status(200).send(allDog);
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
        res.status(400).send('La raza de perro ingresada no existe');
})

router.get('/temperament', async (req, res) => {


    const temperaments = await Temperament.findAll(); // busco todo en la tabla temperaments
    res.send(temperaments)
})

router.post('/dog', async (req, res) => {
    // const { name, height, weight, temperament, image, life_span, createInDB } = req.body;
    // // const body = req.body;
    // // console.log(body);
    // let newDog = await Dog.create({
    //     name,
    //     height,
    //     weight,
    //     image,
    //     life_span,
    //     createInDB
    // });
    // console.log(temperament);
    // let arr = [...temperament]
    // console.log(arr, "arr")
    // let temp = await Temperaments.findAll({where: { name: arr } }  )
    // console.log(temp, "find")
    // temp = temp.map(el=> el.id)
    // console.log(temp,"temp");
    // console.log(newDog)
    // await newDog.addTemperaments(temp)
    // res.send(newDog)
    // const { name, height, weight, life_span, temperament } = req.body;
    // const raza = await Dog.create({
    //     name,
    //     height,
    //     weight,
    //     life_span,
    //     image: `https://i.pinimg.com/564x/1f/fa/f4/1ffaf42fd75e9e01d39547ca46e3e294.jpg`,
    //     createInDB: true,
    // });

    // temperament.forEach(async (temp) => {
    //     const temperamento = await Temperaments.findOrCreate({
    //         where: { name: temp },
    //     });
    //     console.log(temperamento)
    //     await raza.addTemperaments(temperamento[0]);
    // });

    // res.json({
    //     raza
    // });
    const { name, height, weight, life_span, temperaments } = req.body;
    try {
        const raza = await Dog.create({
            name,
            height,
            weight,
            life_span,
            image: `https://i.pinimg.com/564x/1f/fa/f4/1ffaf42fd75e9e01d39547ca46e3e294.jpg`,
            createInDB: true,
        });
        let busc = await Temperament.findAll({
            where : {
                temperament:temperaments
            }
        })
        raza.setTemperaments(busc);


        res.send(busc);
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;
