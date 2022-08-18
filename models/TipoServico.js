const mongoose = require('mongoose');

let TipoServico = mongoose.model('TipoServico', {
    nome: String,
});

module.exports = TipoServico;