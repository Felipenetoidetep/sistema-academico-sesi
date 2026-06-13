const express = require("express");

const router = express.Router();

const turmaController = require("../controllers/turmaController");

router.get(
  "/turmas",
  turmaController.listar
);

router.post(
  "/turmas",
  turmaController.criar
);

router.delete(
  "/turmas/:id",
  turmaController.excluir
);

router.put(
    "/turmas/:id",
    turmaController.atualizar
);

module.exports = router;