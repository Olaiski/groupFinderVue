// const router = require('express').Router();
// const Student = require('../models/Student');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config = require('../config/config');
//
// const { registerValidation } = require('../policies/validation');
// const { loginValidation } = require('../policies/validation');
//
// // REGISTER
// router.post('/register', async (req, res) => {
//     // Bruker funksjonen i policies/validation
//     const { error } = registerValidation(req.body);
//     if (error) return res.status(400).send(error.details[0].message);
//
//
//     // Sjekker om studenten er i db'en
//     const emailExist = await Student.findOne({
//         where: {
//             email: req.body.email
//         }
//     });
//     if (emailExist) return res.status(400).send('E-Mail already exists');
//
//     // Hash passord
//     const salt = await bcrypt.genSalt(10);
//     const hashedPw = await bcrypt.hash(req.body.password, salt);
//
//     try {
//         // Ny student
//         const savedStudent = await Student.create({
//                 firstname: req.body.firstname,
//                 lastname: req.body.lastname,
//                 email: req.body.email,
//                 phonenumber: req.body.phonenumber,
//                 password: hashedPw
//         });
//         console.log(savedStudent);
//         res.send(savedStudent)
//     }catch (e) {
//         res.status(400).send({
//             error: 'E-post er allerede registrert!'
//         })
//     }
//
//
// });
// // LOGIN
// router.post('/login', async (req, res) => {
//     const { error } = loginValidation(req.body);
//     if (error) return res.status(400).send(error.details[0].message);
//
//     // Sjekker om studenten er i db'en
//     const student = await Student.findOne({
//         where: {
//             email: req.body.email
//         }
//     });
//     // if (!student) return res.status(400).send('E-Mail not found');
//     if (!student) {
//         res.status(403).send({
//             error: 'The login information was incorrect'
//         })
//     }
//
//     // ER PASSORD KORREKT?
//     const validPass = await bcrypt.compare(req.body.password, student.password);
//     // if (!validPass) return res.status(400).send('Invalid password');
//     if (!validPass) {
//         res.status(403).send({
//             error: 'The login information was incorrect'
//         })
//     }
//
//     // Lager / tildeler token når man logger inn
//     const token = jwt.sign({_id: student.id}, config.authentication.jwtSecret);
//     res.header('auth-token', token).send(token);
// });
//
//
// module.exports = router;
//
//
//
//
