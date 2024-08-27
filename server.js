require('dotenv').config();
let express = require('express');
let app = express();
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let UserSchema = require('./models/User');
// const session = require('express-session');
// const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
let socketIo = require('socket.io');
let http = require('http').createServer(app);
let cors = require('cors');

const MongoURI = process.env.MONGO_URI;



mongoose.connect(MongoURI).then(res => {
    console.log('connected');
})
const User = mongoose.model('User', UserSchema);

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
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.post('/login', async (req, res) => {
    console.log('l');
    let username = req.body.username;
    let password = req.body.password;
    // Find user from database

    
    
    User.findOne({username}).then(user => {
        if(!user) { 
            return res.json({
                error: 'Incorrect username or password'
            })
        } else {
            // user exists, now check password
            if(bcrypt.compare(password, user.password)) {
                // password matches
                let token = jwt.sign({authedUser: {
                    username,
                }}, process.env.SECRET_JWT, {expiresIn: '24h'});
                return res.json({token});
            } else {
                return res.json({
                    error: "Incorrect username or password"
                })
            }
        }
    })
    .catch(error => {
        console.error(error);
        return res.json({
            error
        })
    })

    // Check password


    // If user exists and passwords match, return user,
    // otherwise return null

    //tmp
    
});

app.post('/register', async (req, res) => {
    console.log('r');
    let username = req.body.username;
    let password = req.body.password;
    // Check if username already exists in database
    User.findOne({username}).then(async user => {
        if(user) {
            // user already exists, 
            return res.json({
                error: 'Username taken'
            })
        }

        let newUser = new User;
        newUser.username = username;
        newUser.password = await bcrypt.hash(password, 12);
        
        try {
            await newUser.save();
            let token = jwt.sign({authedUser: {
                username,
            }}, process.env.SECRET_JWT, {expiresIn: '24h'});
            return res.json({token});
        }
        catch(error) {
            console.error(error);
            return res.json({
                error
            })
        }

    })
    .catch(error => {
        console.error(error);
        return res.json({
            error
        })
    })

    // If it does not exist, add username + password
    // to database with encryption for password,
    // return true


    // If it does exist, do not add anything to database,
    // return an error message
    
})


io.on('connection', socket => {
    let roomID = 1;
    console.log('connection');
    socket.on('roomID', id => {
        roomID = id;
        socket.join(id);
    })  
    socket.on('message', message => {
        io.to(roomID).emit('message', message);
    })
})

http.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})
