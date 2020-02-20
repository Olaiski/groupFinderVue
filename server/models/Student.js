const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcryptjs')); // Tar en funksjon med cb, wrap/tilpasser den til promise format

const piss = () => {
    console.log("PUSS")
}

async function hashPassword (student) { // Tar et passord og hasher det
    const SALT_FACTOR = 8;
    console.log("Finnes jeg?!?!?!?!?!?!")
    if (!student.changed('password')) { // Hvis pw har forandret seg: return
        return;
    }
    return await bcrypt
        .genSaltAsync(SALT_FACTOR) // -> genererer salt
        .then(salt => bcrypt.hashAsync(student.password, salt, null)) // bruker det saltet på brukerens pw
        .then(hash => { // gir oss en hash
            student.setDataValue('password', hash); // setter hash'en på passord
        })
}


const Student = sequelize.define('Student', {

        firstname: {
          type: Sequelize.STRING
        },

        lastname: {
            type: Sequelize.STRING
        },

        email: {
            type: Sequelize.STRING,
            unique: true
        },
        phonenumber: {
          type: Sequelize.STRING
        },

        password: {
            type: Sequelize.STRING
        },


    },{
        timestamps: false,
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword,
            beforeSave: hashPassword
        }

    },
);

    Student.prototype.comparePassword = async function(candidatepassword) {
        return await bcrypt.compareAsync(candidatepassword, this.password);
    };



module.exports = Student;