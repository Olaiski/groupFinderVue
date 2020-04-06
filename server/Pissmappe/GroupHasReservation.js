const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const RoomReservation = sequelize.define('GroupHasReservation', {


},{
    timestamps: false

});
module.exports = RoomReservation;