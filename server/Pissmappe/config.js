module.exports = {
    // port:  3000 || process.env.PORT,
    // db: {
    //     database: process.env.DB_NAME || 'protest',
    //     user: process.env.DB_USER || 'root',
    //     password: process.env.DB_PASS || '1234',
    //     options: {
    //         dialect: process.env.DIALECT || 'mysql',
    //         host: process.env.HOST || 'localhost',
    //     }
    // },
    authentication: { // Brukes for å tildele jwt token, gir den en secret string som bare serveren vet om. Brukes for å sjekke om jwtToken er valid.
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
};
