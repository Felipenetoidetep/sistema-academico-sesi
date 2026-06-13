const express = require("express");

const router = express.Router();

const notaController = require("../controllers/notaController");

router.get(
"/notas",
notaController.listar
);

router.post(
"/notas/lancar",
notaController.lancarNotas
);

router.get(
"/notas/disciplina/:disciplinaId",
notaController.buscarPorDisciplina
);

router.get(
"/notas/boletim/:alunoId",
notaController.boletimAluno
);

router.get(
"/notas/:id",
notaController.buscarPorId
);

router.post(
"/notas",
notaController.criar
);

router.put(
"/notas/:id",
notaController.atualizar
);

router.put(
"/notas/:id/recuperacao",
notaController.recuperacao
);

module.exports = router;
