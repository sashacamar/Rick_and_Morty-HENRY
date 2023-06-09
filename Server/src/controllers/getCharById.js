const axios = require('axios');
const URL = "https://rickandmortyapi.com/api/character/";

async function getCharById(req, res){
    const {id} = req.params;

    //usando promesas
    // axios(URL + id)
    // .then(({data})=>{
    //     const character = {
    //         id : data?.id,
    //         status: data?.status,
    //         name: data?.name,
    //         species: data?.species,
    //         origin: data?.origin,
    //         image: data?.image,
    //         gender: data?.gender
    //     }
    //     if(data){
    //         res.status(200).json(character);
    //     } else{
    //         res.status(404).send('Not fount')
    //     }
    // })
    // .catch((error)=>res.status(500).json(error.message))

    //usando async await
    try {
        const {data} = await axios(URL + id)
        const character = {
                    id : data?.id,
                    status: data?.status,
                    name: data?.name,
                    species: data?.species,
                    origin: data?.origin,
                    image: data?.image,
                    gender: data?.gender
                }
        res.status(200).json(character)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports ={getCharById};