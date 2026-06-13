const express = require("express");

const router = express.Router();

const professorTurmaController = require("../controllers/professorTurmaController");

router.get(
    "/professor-turma",
    professorTurmaController.listar
);

router.post(
    "/professor-turma",
    professorTurmaController.criar
);

module.exports = router;