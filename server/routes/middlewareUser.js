const jwt = require('jsonwebtoken');

// module.exports = {
//     isLoggedIn: (req, res, next) => {
//         try {
//             const token = req.headers.authorization.split(' ')[1];
//             const decoded = jwt.verify(
//                 token,
//                 'SECRETKEY'
//             );
//
//             req.userData = decoded;
//             next();
//         } catch (err) {
//             return res.status(401).send({
//                 msg: 'Your session is not valid!'
//             })
//         }
//     },
// };

exports.isLoggedIn = async (req, res, next) => {
    try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = await jwt.verify(
                token,
                'SECRETKEY'
            );
            req.userData = decoded;
        next();
        } catch (err) {
            return res.status(401).send({
                msg: 'Your session is not valid!'
            })
        }
};

exports.isUser = async (req, res, next) => {
  try {

      req.userEmail = req.body.email;
      next();
  }  catch (e) {
      return res.status(401).send({
          msg: 'Your session is not valid!'
      })
  }
};


