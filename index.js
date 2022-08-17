// config inicial
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('./models/Pessoa')

//forma de ler JSON | middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// rotas API
const pessoaRoutes = require('./routes/pessoaRoutes');
app.use('/person', pessoaRoutes);

// entregar uma porta 
mongoose
    .connect('mongodb://127.0.0.1:27017')  
    .then(() => {
        console.log('Conectado ao MongoDB!');
        app.listen(27017);
    })
    .catch((err) => console.log(err));


