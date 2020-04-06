const Student = require('../models/Student');
const RoomsReservation = require('../models/RoomModels/RoomReservation');
const Groups = require('../models/Group');
const sequelize = require('../util/database');

const { QueryTypes } = require('sequelize');

exports.getAllReservations = async (req, res) => {

    const reservations = await RoomsReservation.findAll();


    res.status(200).send({
        msg: 'Ok! Hentet res..',
        reservations: reservations
    });
};

exports.getUserReservations = async (req, res) => {

    const userReservations = await sequelize.query(
        "SELECT roomreservations.startDateTime, roomreservations.endDateTime, groups.id, students.email " +
        "FROM RoomReservations " +
        "INNER JOIN groups ON roomreservations.GroupId = groups.id " +
        "INNER JOIN students ON groups.StudentId = students.id " +
        "WHERE students.email = '" + req.userData.email + "'", {type: QueryTypes.SELECT});

    res.json(userReservations);

};

exports.reserveRoom = async (req, res) => {

};

exports.getAllRooms = async  (req, res) => {

};