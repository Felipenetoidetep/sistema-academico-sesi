const express = require("express");

const router = express.Router();

const multer = require("multer");

const upload = multer({
    dest: "uploads/"
});

const importacaoController = require("../controllers/importacaoController");

router.post(
    "/importar-alunos",
    upload.single("arquivo"),
    importacaoController.importarAlunos
);

module.exports = router;