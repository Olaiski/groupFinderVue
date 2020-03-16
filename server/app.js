const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');

const authRoute = require('./routes/authRoutes');
const homeRoute = require('./routes/home');


const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

// Route middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// Api routes
app.use('/api/auth', authRoute);
app.use('/api/user', homeRoute);



// Import av databasemodeller
const Student = require('./models/Student');
const Group = require('./models/Group');
const GroupMembership = require('./models/GroupMembership');
const Room = require('./models/Room');
const RoomReservation = require('./models/RoomReservation');
const ChatMessage = require('./models/ChatMessage');
const CourseCode = require('./models/CourseCode');
const CourseRegister = require('./models/CourseRegister');


// DB forhold
Room.belongsToMany(Group, {through: RoomReservation});
Student.belongsToMany(Group, {through: GroupMembership});
Student.belongsToMany(Group, {through: ChatMessage});
Group.belongsTo(Student);
CourseCode.belongsToMany(Student, {through: CourseRegister});

sequelize
    .sync()
    .then(() => {
        app.listen(PORT);
        console.log(`Server started on port ${PORT}`)
    })
    .catch(error => {
        console.log(error);
    });







