// Models folder -> Tables..
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcryptjs')); // Tar en funksjon med cb, wrap/tilpasser den til promise format
const Sequelize = require('sequelize');



function hashPassword(user, options) { // Tar et passord og hasher det
    const SALT_FACTOR = 8;

    if (!user.changed('password')) { // Hvis pw har forandret seg: return
        return;
    }
    return bcrypt
        .genSaltAsync(SALT_FACTOR) // -> genererer salt
        .then(salt => bcrypt.hashAsync(user.password, salt, null)) // bruker det saltet på brukerens pw
        .then(hash => { // gir oss en hash
            user.setDataValue('password', hash); // setter hash'en på passord
        })
}

// Function, returns a usermodel..
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    }, {
        hooks: { // Callback functions,
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword,
            beforeSave: hashPassword
        }
    });
    // Sjekker passord mot modellens passord -> prototype -> uansett model kan bruke denne
    User.prototype.comparePassword = function(candidatepassword) {
        return bcrypt.compareAsync(candidatepassword, this.password)
    };

    return User;
};