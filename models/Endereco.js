const mongoose = require('mongoose');

const enderecoSchema = mongoose.Schema({
    cidade: { type: String },
    estado: { type: String },
    cep: { type: String, required: true },
    info_adicional: { type: String }
});

mongoose.model('Endereco', enderecoSchema);