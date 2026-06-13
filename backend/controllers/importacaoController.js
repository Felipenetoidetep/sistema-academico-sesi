const XLSX = require("xlsx");
const pool = require("../database/connection");

exports.importarAlunos = async (req, res) => {

    try {

        const arquivo = req.file.path;

        const workbook =
            XLSX.readFile(arquivo);

        const sheet =
            workbook.Sheets[
                workbook.SheetNames[0]
            ];

        const alunos =
            XLSX.utils.sheet_to_json(sheet);

        let totalImportados = 0;

        for (const aluno of alunos) {

            await pool.execute(
                `
                INSERT INTO alunos
                (
                    matricula,
                    nome,
                    turma_id
                )
                VALUES
                (?, ?, ?)
                `,
                [
                    aluno.matricula,
                    aluno.nome,
                    aluno.turma_id
                ]
            );

            totalImportados++;

        }

        return res.json({

            mensagem:
                "Alunos importados com sucesso",

            total:
                totalImportados

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            erro:
                "Erro ao importar alunos"

        });

    }

};