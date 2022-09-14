const mongoose = require('mongoose');

let enderecoSchema = mongoose.Schema({
    id: { type: Number },
    cidade: { type: String },
    estado: { type: String },
    cep: { type: String, required: true },
    info_adicional: { type: String }
});

mongoose.model('Endereco', enderecoSchema);