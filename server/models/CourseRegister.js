const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const CourseRegister = sequelize.define('CourseRegister', {


},{
    timestamps: false

});


module.exports = CourseRegister;