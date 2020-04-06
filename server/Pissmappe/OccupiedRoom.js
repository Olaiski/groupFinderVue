const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const Room = sequelize.define('OccupiedRoom', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING
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
module.exports = Room;