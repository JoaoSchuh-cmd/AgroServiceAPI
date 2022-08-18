const router = require('express').Router();

const controllerServico = require('../controllers/servicoController');

router.get('/', controllerServico.get_all_servicos);

router.post('/', controllerServico.salvar_servico);

router.delete('/:id', controllerServico.deletar_servico);

router.patch('/:id', controllerServico.atualizar_servico);

module.exports = router;