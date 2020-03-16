// // Lager express middleware som validerer req / data
// const Joi = require('joi'); // Validerer data (express)
//
// module.exports = {
//     // Eksakt samme metode navn som AS i controller
//     register (req, res, next)  { // 'Middleware' req(kommer inn), res(sender tilbake), next (for å 'invoke' neste i routes path)
//         const schema = {
//             email: Joi.string().email(),
//             password: Joi.string().regex(
//                 new RegExp('^[a-zA-Z0-9]{8,32}$')
//             )
//         };
//         // Første param er det man skal validere, andre param er det man validerer mot
//         const {error, value} = Joi.validate(req.body, schema);
//         if (error) {
//             switch (error.details[0].context.key) { // key (enten email eller password)
//                 case 'email':
//                     res.status(400).send({
//                         error: 'You must provide a valid email address'
//                     });
//                     break;
//                 case 'password':
//                     res.status(400).send({
//                         error: `The password provided failed to match the following rules:
//                         1. It must contain ONLY the following characters: lower case, upper case, numerics
//                         2. It must be at least 8 characters in lenght and not greater than 32 characters in length`
//
//                     });
//                     break;
//
//                 default:
//                     res.status(400).send({
//                         error: 'Invalid registration information'
//                     });
//
//             }
//         } else {
//             next();
//         }
//
//     }
// };