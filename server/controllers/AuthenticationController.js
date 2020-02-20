const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


function jwtSignUser (user) { // Brukes for å generere jwtToken til bruker (brukes lengrened i koden)
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}


exports.register = async (req, res, next) => {
    try {
        const student = await Student.create(req.body);
        const userJson = student.toJSON();
        res.send({
            user: userJson,
            token: jwtSignUser(userJson)
        });
    } catch (err) { // email already exists
        res.status(400).send({
            error: 'This email account is already in use'
        });
    }};

exports.login = async (req, res, next) => {
    try { // Tar email + password fra body
            const {email, password} = req.body;
            const student = await Student.findOne({
                where: {
                    email: email // Finner brukeren med email
                }
            });
            if (!student) { // Sjekker om den finnes
                return res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }
            const isPasswordValid = student.comparePassword(password); // Kaller funksjon i User som bruker bcrypt, sammenligner passord
            if (!isPasswordValid) { // Hvis passord ikke matcher
                return res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }
            const studentJson = student.toJSON();
            res.send({ // Hvis alt får bra, return jwtToken med userinfo
                student: studentJson,
                token: jwtSignUser(studentJson)
            })

        } catch (err) {
        return res.status(500).send({
            error: 'An error has occured trying to log in'
        })
    }
};

//
// module.exports = { // Brukes som 'metodekall' i routes
//
//     async register(req, res) { // bruker async i steden for promises (.then().cath())
//         try {
//             const user = await User.create(req.body);
//             const userJson = user.toJSON();
//             res.send({
//                 user: userJson,
//                 token: jwtSignUser(userJson)
//             });
//         } catch (err) { // email already exists
//             res.status(400).send({
//                 error: 'This email account is already in use'
//             })
//         }
//     },
//
//     async login (req, res) {
//         try { // Tar email + password fra body
//             const {email, password} = req.body;
//             const user = await User.findOne({
//                 where: {
//                     email: email // Finner brukeren med email
//                 }
//             });
//             if (!user) { // Sjekker om den finnes
//                 return res.status(403).send({
//                     error: 'The login information was incorrect'
//                 })
//             }
//
//             const isPasswordValid = user.comparePassword(password); // Kaller funksjon i User som bruker bcrypt, sammenligner passord
//             if (!isPasswordValid) { // Hvis passord ikke matcher
//                 return res.status(403).send({
//                     error: 'The login information was incorrect'
//                 })
//             }
//             const userJson =  user.toJSON();
//             res.send({ // Hvis alt får bra, return jwtToken med userinfo
//                 user: userJson,
//                 token: jwtSignUser(userJson)
//             })
//
//         } catch (err) { // email already exists
//            return res.status(500).send({
//                 error: 'An error has occured trying to log in'
//             })
//
//
//         }
//
//     },
//
// };
