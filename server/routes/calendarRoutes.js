const router = require('express').Router();
const ReservationController = require('../controllers/CalendarController');
const middlewareUser = require('./middlewareUser');


router.get('/kalender', middlewareUser.isLoggedIn, (req,res) =>{});

router.post('/reserveRoom',middlewareUser.isLoggedIn, ReservationController.reserveRoom);

router.delete('/cancelReservation',middlewareUser.isLoggedIn, ReservationController.cancelReservation);
router.post('/updateReservation', middlewareUser.isLoggedIn, ReservationController.updateReservation);

router.get('/groupLeaderGroups', middlewareUser.isLoggedIn, ReservationController.groupLeaderGroupsAll);
router.get('/userReservations', middlewareUser.isLoggedIn, ReservationController.getUserReservations);
router.get('/vacantRooms', ReservationController.getVacantRooms);



module.exports = router;