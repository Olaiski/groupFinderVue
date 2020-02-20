const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
// const morgan = require('morgan');
// const {sequelize} = require('./models');
const sequelize = require('./util/database');

const AuthRoutes = require('./routes/AuthRoutes');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/auth', AuthRoutes);


// Import av databasemodeller
const Student = require('./models/Student');
const Group = require('./models/Group');
const GroupMembership = require('./models/GroupMembership');
const Room = require('./models/Room');
const RoomReservation = require('./models/RoomReservation');
const ChatMessage = require('./models/ChatMessage');
const CourseCode = require('./models/CourseCode');
const CourseRegister = require('./models/CourseRegister');

Room.belongsToMany(Group, {through: RoomReservation});
Student.belongsToMany(Group, {through: GroupMembership});
Student.belongsToMany(Group, {through: ChatMessage});
Group.belongsTo(Student);
CourseCode.belongsToMany(Student, {through: CourseRegister});

sequelize
    .sync()
    .then(() => {
        app.listen(3000);
        console.log(`Server started on port 3000`)
    })
    .catch(error => {
        console.log(error);
    });







