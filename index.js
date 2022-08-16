// config inicial
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('./models/Pessoa')
// const DB_USER = process.env.DB_USER;
// const DB_PASS = encodeURIComponent(process.env.DB_PASS);
const DB_USER = 'JoaoSchuh';
const DB_PASS = encodeURIComponent('Joao24252635');


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
    .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.md2jir7.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Conectado ao MongoDB!');
        app.listen(3000);
    })
    .catch((err) => console.log(err));


