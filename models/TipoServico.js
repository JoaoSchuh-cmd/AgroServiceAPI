const mongoose = require('mongoose');

let TipoServico = mongoose.model('TipoServico', {
    id: { type: Number },
    nome: String,
});

module.exports = TipoServico;