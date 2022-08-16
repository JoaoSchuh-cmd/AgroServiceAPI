const mongoose = require('mongoose');

let pessoaSchema = new mongoose.Schema({
    nome: { type: String },
    cpf: { type: String, required: true },
    usuario: { type: String },
    senha: { type: String },
    celular: { type: String },
});

mongoose.model('Pessoa', pessoaSchema);