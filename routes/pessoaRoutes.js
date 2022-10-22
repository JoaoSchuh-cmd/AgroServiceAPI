const router = require('express').Router();

const controllerPessoa = require('../controllers/pessoaController');

// create - inserção
router.post('/', controllerPessoa.salvar_pessoa);

// read - leitura de todos dados
router.get('/', controllerPessoa.get_all_pessoas);

// read - busca de pessoa
router.get('/id=:id', controllerPessoa.get_pessoa);

// read - busca de pessoa pelo nome de usuário
router.get('/username=:username', controllerPessoa.get_pessoaByUsername);

// update - atualizar os dados (PUT, PATCH) PUT = espera o objeto completo, PATCH = atualizacao parcial
router.patch('/:id', controllerPessoa.atualizar_pessoa_info);

// delete - deletar dados
router.delete('/:id', controllerPessoa.excluir_pessoa);

module.exports = router;