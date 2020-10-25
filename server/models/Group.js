const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Group = sequelize.define('Group', {

    groupName: {
        type: Sequelize.STRING
    },

    },{
    timestamps: false

    });


module.exports = Group;