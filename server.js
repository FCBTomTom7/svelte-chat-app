require('dotenv').config();
let express = require('express');
let app = express();
let socketIo = require('socket.io');
let http = require('http').createServer(app);
let cors = require('cors');
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
    res.json({
        name: req.body.username
    });
});

app.post('/register', (req, res) => {
    console.log('r');
    res.json({
        name: req.body.username
    })
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
