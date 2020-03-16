const jwt = require('jsonwebtoken');
const config = require('./config');

// Protected routes, kan legges til alle routes vi vil skal være privat/protected
// Middelware function, sjekker om brukeren/studenten har 'rett' token.
// (Token blir opprettet når en bruker logger inn)
module.exports = function(req, res, next){
    const token = req.header('auth-token'); // Sjekker request har token
    if (!token) return res.status(400).send('Access Denied');

    try{
        // const token = req.headers.authorization.replace("Bearer ", "");
        // if (!token) return res.status(400).send('Access Denied');

        // Token fra header + secret
        const verified = jwt.verify(token, config.authentication.jwtSecret);
        req.student = verified;
        next();
    }catch (e) {
        res.status(400).send('Invalid token');
    }

};

