const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');

const authRoute = require('./routes/authRoutes');
const homeRoute = require('./routes/home');
const calendarRoute = require('./routes/calendarRoutes');


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
app.use('/api/user', calendarRoute);




// Import av databasemodeller
const Student = require('./models/Student');
const Group = require('./models/Group');
const GroupMembership = require('./models/GroupMembership');
const Room = require('./models/RoomModels/Room');
const RoomReservation = require('./models/RoomModels/RoomReservation');
const RoomType = require('./models/RoomModels/RoomType');
const ChatMessage = require('./models/ChatMessage');
const CourseCode = require('./models/CourseCode');
const CourseRegister = require('./models/CourseRegister');


//hasOne - adds a foreign key to the target and singular association mixins to the source.
//belongsTo - add a foreign key and singular association mixins to the source.
//hasMany - adds a foreign key to target and plural association mixins to the source.
//belongsToMany - creates an N:M association with a join table and adds plural association mixins to the source. The junction table is created with sourceId and targetId.

// DB forhold
// Room.belongsToMany(Group, {through: RoomReservation});
Room.hasOne(RoomReservation);
Group.hasMany(RoomReservation);
RoomType.hasOne(Room);
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







