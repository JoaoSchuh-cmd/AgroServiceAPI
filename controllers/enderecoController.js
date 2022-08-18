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
            if (!await EnderecoModel.findOne({ _id: id })) {
                res.status(422).json({ message: 'Endereço não encontrado' });
                return;
            }

            const { cidade, estado, cep, info_adicional } = req.body;

            const newEndereco = {
                cidade,
                estado,
                cep,
                info_adicional
            }

            const updatedEndereco = await EnderecoModel.updateOne({ _id: id }, newEndereco);
        
            if (updatedEndereco.modifiedCount === 0) 
                res.status(424).json({message: 'Nenhum dado foi alterado'})

            res.status(200).json({message: 'Endereço atualizado', endereco: updatedEndereco})
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
            let endereco = await EnderecoModel.deleteOne({ _id: id });

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