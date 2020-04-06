const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const Room = sequelize.define('ReservedRoom', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    }

},{
    timestamps: false

});
module.exports = Room;