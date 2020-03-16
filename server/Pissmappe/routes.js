// const AuthenticationController = require('./controllers/AuthenticationController')
//
// const AutheticationControllerPolicy = require('./policies/AthenticationControllerPolicy');
//
// module.exports = (app) => {
//     // Kaller på AuthController metodene
//     app.post('/register', // Register end-point
//       AutheticationControllerPolicy.register, // Kaller 'policien' som en middleware funksjon før vi 'treffer' Controller(en)
//       AuthenticationController.register);
//
//     app.post('/login', // Login end-point
//         AuthenticationController.login)/*, (req, res) => {
//         if(!req.body.name) {
//         return res.status(400).json({
//             status: 'error',
//             error: 'blabla empty'
//         });
//         }
//         res.status(200).json({
//             status: 'success',
//             data: req.body
//         })
//             console.log("HEYYEYEYEYEYEYEYEYYEYEXXXX" + res.headersSent);
//
//         });*/
//
// };
