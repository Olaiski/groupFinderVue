const Sequelize = require('sequelize');
const sequelize = require('../../util/database');


const RoomReservation = sequelize.define('RoomReservation', {

    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    startDateTime: {
        type: Sequelize.DATE
    },
    endDateTime: {
        type: Sequelize.DATE
    },


    },{
    timestamps: false

    });
module.exports = RoomReservation;