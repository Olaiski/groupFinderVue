const Sequelize = require('sequelize');
const sequelize = require('../util/database');

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

    },
);




module.exports = Student;