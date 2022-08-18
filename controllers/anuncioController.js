const mongoose = require('mongoose');

const AnuncioModel = mongoose.model('Anuncio');
const ServicoModel = mongoose.model('Servico');
const EnderecoModel = mongoose.model('Endereco');
const PessoaModel = mongoose.model('Pessoa');

module.exports = {
    get_all_anuncios: async (req, res) => {
        try {
            const anuncios = await AnuncioModel.find({}).select("id_usuario id_servico id_endereco");

            res.status(200).json({
                count: anuncios.length,
                anuncios: anuncios.map(anuncio => {
                    return {
                        usuario: anuncio.id_usuario,
                        servico: anuncio.id_servico,
                        endereco: anuncio.id_endereco,
                        _id: anuncio._id
                    }
                })
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    get_anuncios_usuario: async (req, res) => {
        const userId = req.params.id;

        if (!await PessoaModel.findOne({ _id: id })) {
            res.status(422).json({ message: 'Pessoa não encontrada' });
            return;
        }
        try {
            let anuncios = await AnuncioModel
                .find({ id_usuario: userId })
                .select("id_usuario id_servico id_endereco");

            anuncios ?
                res.status(422).json('Não foram encontrados anúncios')
                : res.status(200).json(anuncios);

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    salvar_anuncio: async (req, res) => {
        try {
            let servico = await ServicoModel.findOne({ _id: req.body.id_servico });
            let endereco = await EnderecoModel.findOne({ _id: req.body.id_endereco });
            let pessoa = await PessoaModel.findOne({ _id: req.body.id_pessoa });

            if (!servico) {
                res.status(404).json({ message: 'Serviço não existe' })
                return;
            };
            if (!endereco) {
                res.status(404).json({ message: 'Endereco não existe' });
                return;
            };
            if (!pessoa) {
                res.status(404).json({ message: 'Pessoa não existe' });
                return;
            };

            let anuncio = new AnuncioModel({});
            anuncio.id_endereco = req.body.id_endereco;
            anuncio.id_servico = req.body.id_servico;
            anuncio.id_pessoa = req.body.id_pessoa;

            anuncio = await anuncio.save();

            res.status(200).json({
                message: 'Anuncio salvo com sucesso!',
                createdAnuncio: {
                    _id: anuncio._id,
                    id_servico: anuncio.id_servico,
                    id_endereco: anuncio.id_endereco,
                    id_pessoa: anuncio.id_pessoa
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    atualizar_anuncio: async (req, res) => {
        const id = req.params.id;

        const { id_endereco, id_pessoa, id_servico } = req.body;

        const anuncio = {
            id_endereco,
            id_pessoa,
            id_servico
        }

        try {
            let anuncioAtualizado = await AnuncioModel.updateOne({ _id: id }, anuncio);

            if (!anuncioAtualizado) {
                res.status(422).json({ error: 'Anúncio não encontrado' });
                return;
            }
            if (anuncioAtualizado.modifiedCount === 0) {
                res.status(424).json({ error: 'Nenhum dado foi alterado' });
                return;
            }

            req.status(200).json({
                message: 'Anuncio atualizado',
                _id: anuncioAtualizado._id
            })

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    excluir_anuncio: async (req, res) => {
        try {
            const id = req.params.id;

            const anuncio = await AnuncioModel.deleteOne({ _id: id });

            if (!anuncio) {
                res.status(422).json({ error: 'Anúncio não encontrado' });
                return;
            }

            req.status(200).json({
                message: 'Pessoa deletada',
                _id: anuncio._id
            })
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    get_filtered_anuncios: async (req, res) => {
        //TODO
        const tipoServico = req.params.tipoServico;
        const valorHr = req.params.valorHr;
        const dataInicial = req.params.dataInicial;
        const dataFinal = req.params.dataFinal;
        const cidade = req.params.cidade;
        const estado = req.params.estado;

        // const servicos = await ServicoModel.find({
        //     id_servico: await ServicoModel.find(async (filtros) => {
        //         if (tipoServico != '?')
        //             id_tipo_servico: tipoServico
        //         if (valorHr != '?')
        //             valorHora: valorHr
        //         if (dataInicial != '?')
        //             data_inicial: dataInicial
        //         if (dataFinal != '?')
        //             data_final: dataFinal
        //     })
        // })

        // const enderecos = await EnderecoModel.find(async (filtros) => {
        //     if (cidade != '?')
        //         cidade: cidade
        //     if (estado != '?')
        //         estado: estado
        // })

        // let anuncios = await AnuncioModel.find(servicos, enderecos);
    }
}