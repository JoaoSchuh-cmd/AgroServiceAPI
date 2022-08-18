const router = require('express').Router();

const controllerAnuncio = require('../controllers/anuncioController');

router.get('/', controllerAnuncio.get_all_anuncios);

router.get('/pessoa=:id', controllerAnuncio.get_anuncios_usuario);

//TODO
router.get('/tipoServico=:tipoServico&valorHr=:valorHr&dataInicial=:dataI&dataFinal=:dataF&cidade=:cidade&estado=:estado', controllerAnuncio.get_filtered_anuncios)

router.post('/', controllerAnuncio.salvar_anuncio);

router.patch('/:id', controllerAnuncio.atualizar_anuncio);

router.delete('/:id', controllerAnuncio.excluir_anuncio);

module.exports = router;