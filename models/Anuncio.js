const mongoose = require('mongoose');

let anuncioSchema = new mongoose.Schema({
   id_pessoa: { type: mongoose.Schema.Types.ObjectId, ref: 'Pessoa' },
   id_servico: { type: mongoose.Schema.Types.ObjectId, ref: 'Servico' },
   id_endereco: { type: mongoose.Schema.Types.ObjectId, ref: 'Endereco' },
});

mongoose.model('Anuncio', anuncioSchema);