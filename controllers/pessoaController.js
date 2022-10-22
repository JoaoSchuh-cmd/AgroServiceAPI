const mongoose = require('mongoose');
const PessoaModel = mongoose.model('Pessoa');

module.exports = {
    get_all_pessoas: async (req, res) => {
        try {
            const pessoas = await PessoaModel.find({}).select("nome cpf usuario senha celular");
            console.log(pessoas);
            res.status(200).json({
                pessoas: pessoas.map(pessoa => {
                    return {
                        id: pessoa.id,
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
        const _id = req.params.id;

        try {
            let pessoa = await PessoaModel.findOne({ id: _id });

            if (!pessoa) {
                res.status(422).json({});
                return;
            }

            res.status(200).json(pessoa);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    get_pessoaByUsername: async (req, res) => {
        const username = req.params.username;

        try {
            let pessoa = await PessoaModel.findOne({ usuario: username });

            if (!pessoa) {
                console.log(res.status(422).json({ message: "Usuário não encontrado!" }));
                return;
            }

            res.status(200).json(pessoa);

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    salvar_pessoa: async (req, res) => {
        console.log(req.body);
        try {
            if (await PessoaModel.findOne({ cpf: req.body.cpf })) {
                res.status(424).json({ message: 'CPF informado já foi cadastrado!' });
                return;
            }
            if (await PessoaModel.findOne({ celular: req.body.celular })) {
                res.status(424).json({ message: 'Celular informado já foi cadastrado!' });
                return;
            }

            let pessoa = new PessoaModel({});
            pessoa.id = req.body.id;
            pessoa.nome = req.body.nome;
            pessoa.cpf = req.body.cpf;
            pessoa.usuario = req.body.usuario;
            pessoa.senha = req.body.senha;
            pessoa.celular = req.body.celular;

            await PessoaModel.create(pessoa);

            res.status(201).json({
                message: 'Pessoa salva com sucesso!',
                createdPessoa: {
                    id: pessoa.id,
                    nome: pessoa.nome
                }
            })
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    atualizar_pessoa_info: async (req, res) => {
        const _id = req.params.id;

        let oldPessoa = await PessoaModel.findOne({ id: _id });

        if (!oldPessoa) {
            res.status(422).json({ message: 'Pessoa não encontrada' });
            return;
        }

        const { id, nome, cpf, usuario, senha, celular } = req.body;

        let newPessoa = {
            id,
            nome,
            cpf,
            usuario,
            senha,
            celular
        }

        try {
            let pessoaAtualizada = await PessoaModel.updateOne(oldPessoa, newPessoa);

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
        const _id = req.params.id;

        try {
            const pessoa = await PessoaModel.findOne({ id: _id });

            if (!pessoa) {
                res.status(422).json({ message: 'Pessoa não encontrada' });
                return;
            }

            let status = await PessoaModel.deleteOne(pessoa);

            if (status.deletedCount === 0) {
                res.status(424).json({ message: 'Não foi possível deletar o usuário informado' });
                return;
            }

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