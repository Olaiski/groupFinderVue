const router = require('express').Router();
const middlewareUser = require('./middlewareUser');

router.get('/home', middlewareUser.isLoggedIn,  (req, res, next) => {

    console.log(req.userData);
    res.send("This is the secret content. Only logged in user can see this..!")
});


module.exports = router;