const mongoose = require('mongoose');
const TipoServico = require('../models/TipoServico');

const TipoServicoModel = mongoose.model('TipoServico');

module.exports = {
    get_all_tipos_servico: async (req, res) => {
        try {
            const tipos = await TipoServicoModel.find();

            !tipos ?
                res.status(422).json({ message: 'Não foram encontrados anúncios' }) :
                res.status(200).json(tipos);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    get_tipo_servico: async (req, res) => {
        const id = req.params.id;

        try {
            const tipoServico = await TipoServicoModel.findOne({ _id: id });

            !tipoServico ?
                res.status(424).json({ message: 'Tipo de serviço não encontrado' }) :
                res.status(200).json(tipoServico);

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    deletar_tipo_servico: async (req, res) => {
        const id = req.params.id;

        try {
            if (!await TipoServicoModel.findOne({ _id: id })) {
                res.status(422).json({ message: 'Tipo de Serviço não encontrado' });
                return;
            }

            const tipoServico = await TipoServicoModel.deleteOne({ _id: id });

            res.status(200).json({ message: 'Tipo de serviço deletado', tipoServico: tipoServico })
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    atualizar_tipo_servico: async (req, res) => {
        const id = req.params.id;

        try {
            if (!await TipoServicoModel.find({ _id: id })) {
                res.status(424).json({ message: 'Tipo de Serviço não encontrado!' });
                return;
            }

            const nome = req.body.nome;

            const newTipoServico = nome;

            const updatedTipoServico = await TipoServicoModel.updateOne({ _id: id }, newTipoServico);

            if (updatedTipoServico.modifiedCount === 0) {
                res.status(424).json({ message: 'Nenhum dado foi alterado' });
                return;
            }

            res.status(200).json({ message: 'Tipo de Serviço atualizado', tipoServico: updatedTipoServico });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    salvar_tipo_servico: async (req, res) => {
        try {
            const newTipoServico = new TipoServicoModel();
            newTipoServico.nome = req.body.nome;  
            
            newTipoServico = await TipoServicoModel.create(newTipoServico);

            res.status(200).json({
                message: 'Tipo serviço criado com sucesso!', 
                newTipoServico: newTipoServico
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}