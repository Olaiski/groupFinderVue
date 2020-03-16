const router = require('express').Router();
const AuthenticationController = require('../controllers/AthenticationController');

router.post('/login', AuthenticationController.login);

router.post('/register', AuthenticationController.register);





module.exports = router;