const router = require('express').Router();

const controllerTipoServico = require('../controllers/tipoServicoController');

router.get('/', controllerTipoServico.get_all_tipos_servico);

router.get('/:id', controllerTipoServico.get_tipo_servico);

router.post('/', controllerTipoServico.salvar_tipo_servico);

router.delete('/:id', controllerTipoServico.deletar_tipo_servico);

router.patch('/:id', controllerTipoServico.atualizar_tipo_servico);

module.exports = router;