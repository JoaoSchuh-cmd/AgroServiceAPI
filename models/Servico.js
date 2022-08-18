const mongoose = require('mongoose');

let servicoSchema = mongoose.Schema({
    id_tipo_servico: { type: mongoose.Schema.Types.ObjectId, ref: 'Endereco' },
    descricao: { type: String },
    data_inicio: { type: Date, required: true },
    data_fim: { type: Date, required: true },
    valorHora: { type: Number, required: true },
});

mongoose.model('Servico', servicoSchema);