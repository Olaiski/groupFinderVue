const router = require('express').Router();
const AuthenticationController = require('../controllers/AthenticationController');

router.post('/login', AuthenticationController.login, (req,res,next) =>{});

router.post('/register', AuthenticationController.register, (req,res,next) =>{});



module.exports = router;