const mongoose = require('mongoose');

let pessoaSchema = new mongoose.Schema({
    id: { type: Number },
    nome: { type: String },
    cpf: { type: String, required: true },
    usuario: { type: String },
    senha: { type: String },
    celular: { type: String },
    message: { type: String}
});

mongoose.model('Pessoa', pessoaSchema);