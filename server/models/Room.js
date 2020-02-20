const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const Room = sequelize.define('Room', {

    name: {
        type: Sequelize.STRING
    },



    },{
    timestamps: false

    });
module.exports = Room;