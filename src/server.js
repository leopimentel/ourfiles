//express - define rotas e outras coisas pra o app
const express = require('express');

//ORM - escrever em js 
const mongoose = require('mongoose');

const server = require('http').Server(app);

//aqi app ja entende http e socket
const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log('ok');
    socket.on('connectRoom', box => {
        socket.join(box);
    });
});

//uom4Z#g5*Kn
mongoose.connect('mongodb+srv://omnistack:jo0KC0lLR0t387sk@cursonode-ijeke.mongodb.net/omnistack?retryWrites=true',
{
    useNewUrlParser: true,   
});

//nodemon = hotreload do server

//salva variaveis da app
const app = express();

app.use(cors());

const path = require('path');

const cors = require('cors');

//aceita json
app.use(express.json());


//aceita arquivo
app.use(express.urlencoded({ extended: true }));

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

//importa as rotas
app.use(require('./routes'));

//middleware
app.use((req, res, next) => {
    req.io = io;
    //precisa passa para o next middleware
    return next();
});

server.listen(process.env.PORT || 3333);
