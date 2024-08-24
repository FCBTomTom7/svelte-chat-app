require('dotenv').config();
let express = require('express');
let app = express();
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
let socketIo = require('socket.io');
let http = require('http').createServer(app);
let cors = require('cors');

const MongoURI = process.env.MONGO_URI;

// mongoose.connect(MongoURI).then(res => {
//     console.log('connected');
// })

// const store = new MongoDBSession({
//     uri: MongoURI,
//     collection: 'sessions',
// })

// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store
// }))

const io = socketIo(http, {
    cors: { origin: '*', methods: ["GET", "POST"]}
});
const PORT = process.env.PORT;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.post('/login', (req, res) => {
    console.log('l');
    // Find user from database


    // Check password


    // If user exists and passwords match, return user,
    // otherwise return null

    //tmp
    res.json(true);
});

app.post('/register', (req, res) => {
    console.log('r');
    // Check if username already exists in database


    // If it does not exist, add username + password
    // to database with encryption for password,
    // return true


    // If it does exist, do not add anything to database,
    // return an error message

    //tmp
    res.json(true)
})


io.on('connection', socket => {
    console.log('connection');
    socket.on('message', message => {
        io.emit('message', message);
    })
})

http.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})
