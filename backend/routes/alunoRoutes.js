const express = require("express");

const router = express.Router();

console.log("ROTAS DE ALUNOS CARREGADAS");

const alunoController = require("../controllers/alunoController");

const authMiddleware = require("../middleware/authMiddleware");
const perfilMiddleware = require("../middleware/perfilMiddleware");

router.get(
    "/alunos",
    alunoController.listar
);

router.get(
    "/alunos/turma/:turma_id",
    alunoController.listarPorTurma
);


router.put(
    "/alunos/:id",
    authMiddleware,
    alunoController.atualizar
); 

router.delete(
    "/alunos/:id",
    authMiddleware,
    alunoController.excluir
);

router.get(
    "/alunos/matricula/:matricula",
    alunoController.buscarPorMatricula
);

router.get(
    "/alunos/busca/:busca",
    alunoController.buscarAluno
);

module.exports = router;