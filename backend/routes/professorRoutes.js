const express = require("express");

const router = express.Router();

const professorController = require("../controllers/professorController");

const authMiddleware = require("../middleware/authMiddleware");

router.get(
    "/professores",
    professorController.listar
);

router.get(
    "/professores/:id",
    professorController.buscarPorId
);

router.post(
    "/professores",
    professorController.criar
);

router.put(
    "/professores/:id",
    professorController.atualizar
);

router.delete(
    "/professores/:id",
    professorController.excluir
);

router.get(
    "/minhas-turmas",
    authMiddleware,
    professorController.minhasTurmas
);

module.exports = router;