const mongoose = require('mongoose');

const ServicoModel = mongoose.model('Servico');

module.exports = {
    get_all_servicos: async (req, res) => {
        try {
            const servicos = await ServicoModel.find();

            !servicos ?
                res.status(200).json(servicos) :
                res.status(422).json({ message: 'Não foram encontrados serviços' });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    salvar_servico: async (req, res) => {
        try {
            let servico = new ServicoModel();
            servico.id_tipo_servico = req.body.id_tipo_servico;
            servico.descricao = req.body.descricao;
            servico.data_inicio = req.body.data_inicio;
            servico.data_fim = req.body.data_fim;
            servico.valorHora = req.body.valorHora;

            servico = await ServicoModel.create(servico);

            res.status(200).json({ message: 'Servico criado com sucesso!', servico })
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    deletar_servico: async (req, res) => {
        try {
            const id = req.params.id;

            if (!await ServicoModel.findOne({ _id: id })) {
                res.status(422).json({ message: 'Serviço não encontrado' });
                return;
            }

            const servico = await ServicoModel.deleteOne({ _id: id });

            res.status(200).json({ message: 'Serviço deletado', _id: id });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    atualizar_servico: async (req, res) => {
        try {
            const id = req.params.id;

            if (await ServicoModel.findOne({_id: id})) {
                res.status(422).json({message: 'Serviço não encontrado'});
                return;
            }

            const {id_tipo_servico, descricao, data_inicio, data_fim, valorHora} = req.body;
            
            const newServico = {
                id_tipo_servico,
                descricao,
                data_inicio,
                data_fim,
                valorHora
            }

            const updatedServico = await ServicoModel.updateOne({_id: id}, newServico);

            if (updatedServico.modifiedCount === 0) 
                res.status(424).json({message: 'Nenhum dado foi alterado'});

            res.status(200).json({message: 'Serviço atualizado!', servico: updatedServico})
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}