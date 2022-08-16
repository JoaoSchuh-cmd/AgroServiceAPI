const mongoose = require('mongoose');

const EnderecoModel = mongoose.model('Endereco');

module.exports = {
    get_endereco: async (req, res) => {
        const id = req.params.id

        try {
            let endereco = await EnderecoModel.findOne({ _id: id });

            if (!endereco) {
                res.status(422).json({ error: 'Endereço não encontrado' });
                return;
            }

            res.status(200).json({ endereco })

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    atualizar_endereco: async (req, res) => {
        const id = req.params.id

        try {
            
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    salvar_endereco: async (req, res) => {
        try {
            let endereco = new EnderecoModel({});
            endereco.cidade = req.body.cidade;
            endereco.estado = req.body.estado;
            endereco.cep = req.body.cep;
            endereco.info_adicional = req.body.info_adicional;

            endereco = await endereco.save();

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    deletar_endereco: async (req, res) => {
        const id = req.params.id;

        try {
            let endereco = await EnderecoModel.findOne({ _id: id });

            if (!endereco) {
                res.status(422).json({ error: 'Não foi encontrado o endereço!' });
                return;
            }

            res.status(200).json({
                message: 'Endereço deletado com sucesso!',
                _id: id
            })

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}