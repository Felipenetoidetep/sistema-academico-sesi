const express = require("express");

const router = express.Router();

const disciplinaController =
require("../controllers/disciplinaController");

router.get(
    "/disciplinas/turma/:turma_id",
    disciplinaController.listarPorTurma
);

router.get(
    "/disciplinas",
    disciplinaController.listar
);
router.post(
    "/disciplinas",
    disciplinaController.criar
);

router.put(
    "/disciplinas/:id",
    disciplinaController.atualizar
);

router.delete(
    "/disciplinas/:id",
    disciplinaController.excluir
);

module.exports = router;