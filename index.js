// config inicial
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('./models/Pessoa');
require('./models/Anuncio');
require('./models/Servico');
require('./models/Endereco');
require('./models/TipoServico');

//forma de ler JSON | middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// rotas API
const pessoaRoutes = require('./routes/pessoaRoutes');
app.use('/pessoa', pessoaRoutes);

const anuncioRoutes = require('./routes/anuncioRoutes');
app.use('/anuncio', anuncioRoutes);

const enderecoRoutes = require('./routes/enderecoRoutes');
app.use('/endereco', enderecoRoutes);

const servicoRoutes = require('./routes/servicoRoutes');
app.use('/servico', servicoRoutes);

const tipoServicoRoutes = require('./routes/tipoServicoRoutes');
app.use('/tipoServico', tipoServicoRoutes);

// entregar uma porta s
mongoose
    .connect('mongodb://127.0.0.1:27017')
    .then(() => {
        console.log('Conectado ao MongoDB!');
        app.listen(27017);
    })
    .catch((err) => console.log(err));


