const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const CourseCode = sequelize.define('CourseCode', {


    courseCode: {
        type: Sequelize.STRING
    },

},{
    timestamps: false

});


module.exports = CourseCode;