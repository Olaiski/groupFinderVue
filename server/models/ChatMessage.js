const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ChatMessage = sequelize.define('ChatMessage', {


    message: {
        type: Sequelize.STRING
    },
    timeStamp: {
        type: Sequelize.DATE
    },

    },{
    timestamps: false

    });

module.exports = ChatMessage;