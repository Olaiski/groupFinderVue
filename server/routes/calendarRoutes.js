const router = require('express').Router();
const ReservationController = require('../controllers/CalendarController');
const middlewareUser = require('./middlewareUser');

router.get('/reservations', middlewareUser.isLoggedIn, ReservationController.getAllReservations);

router.post('/reserveRoom', middlewareUser.isLoggedIn, ReservationController.reserveRoom);

router.get('/rooms', middlewareUser.isLoggedIn, ReservationController.getAllRooms);

router.get('/userReservations', middlewareUser.isLoggedIn, ReservationController.getUserReservations);



module.exports = router;