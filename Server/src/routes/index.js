const {getCharById} = require('../controllers/getCharById');
const { postFav, deleteFav, getFavs } = require('../controllers/handleFavorites');
const {login} = require('../controllers/login');
const {Router} = require('express');
const router = Router()

router.get( "/character/:id", getCharById);

router.get("/login", login);

router.post("/fav", postFav);

router.delete("/fav/:id", deleteFav)

//esto lo tengo en el backend, pero no lo estoy usando en el front
router.get('/fav', getFavs)


module.exports = router;