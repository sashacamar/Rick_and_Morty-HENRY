let favs = require('../utils/favs')

function postFav(req,res){
    const character = req.body;
    favs.push(character);
    res.status(201).json(favs);
}

function getFavs(req,res){
    res.status(200).json(favs);
}

function deleteFav(req,res){
    const {id}=req.params;
    newfavs = favs.filter((char)=>char.id!==Number(id))

    if(newfavs.length === favs.length) return res.status(404).json({msg:'no hay personaje con ese id para eliminar'})
    
    favs = newfavs;
    return res.status(201).json(favs)
    
}

module.exports = {postFav, getFavs, deleteFav};