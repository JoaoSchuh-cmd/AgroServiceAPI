const mongoose = require('mongoose');
const PessoaModel = mongoose.model('Pessoa');

module.exports = {
    get_all_pessoas: async (req, res) => {
        try {
            const pessoas = await PessoaModel.find({}).select("nome cpf usuario senha celular");
            console.log(pessoas);
            res.status(200).json({
                count: pessoas.length,
                pessoas: pessoas.map(pessoa => {
                    return {
                        nome: pessoa.nome,
                        cpf: pessoa.cpf,
                        usuario: pessoa.usuario,
                        senha: pessoa.senha,
                        celular: pessoa.celular,
                        _id: pessoa._id,
                    }
                })
            });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    get_pessoa: async (req, res) => {
        const id = req.params.id;

        try {
            let pessoa = await PessoaModel.findOne({ _id: id });

            res.status(200).json(pessoa);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    salvar_pessoa: async (req, res) => {
        console.log(req.body);
        try {
            let pessoa = new PessoaModel({});
            pessoa.nome = req.body.nome;
            pessoa.cpf = req.body.cpf;
            pessoa.usuario = req.body.usuario;
            pessoa.senha = req.body.senha;
            pessoa.celular = req.body.celular;

            pessoa = await pessoa.save();

            res.status(201).json({
                message: 'Pessoa salva com sucesso!',
                createdPessoa: {
                    nome: pessoa.nome,
                    _id: pessoa._id,
                }
            })
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    atualizar_pessoa_info: async (req, res) => {
        const id = req.params.PessoaId;

        const { nome, cpf, usuario, senha, celular } = req.body;

        const pessoa = {
            nome,
            cpf,
            usuario,
            senha,
            celular
        }

        try {
            let pessoaAtualizada = await PessoaModel.updateOne({ _id: id }, pessoa);

            if (!pessoaAtualizada) {
                res.status(422).json({ error: 'Usuario não encontrado' });
                return;
            } else if (pessoaAtualizada.modifiedCount === 0) {
                res.status(424).json({ error: 'Nenhum dado foi alterado!' });
                return;
            } else
                res.status(200).json({ pessoaAtualizada })
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    excluir_pessoa: async (req, res) => {
        const id = req.params.PessoaId;

        try {
            let status = await PessoaModel.deleteOne({ _id: id });

            res.status(200).json({
                message: 'Pessoa Deletada!',
                status: status
            })
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}