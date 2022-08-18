const router = require('express').Router();

const controllerEndereco = require('../controllers/enderecoController');

router.get('/', controllerEndereco.get_endereco);

router.post('/', controllerEndereco.salvar_endereco);

router.patch('/:id', controllerEndereco.atualizar_endereco);

router.delete('/:id', controllerEndereco.deletar_endereco);

module.exports = router;