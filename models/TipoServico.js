const mongoose = require('mongoose');

const TipoServico = mongoose.model('TipoServico', {
    nome: String,
});

module.exports = TipoServico;