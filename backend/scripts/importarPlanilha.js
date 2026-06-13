const XLSX = require("xlsx");
const pool = require("../database/connection");

async function importar() {

    try {

        const workbook = XLSX.readFile(
            "C:/sesiacademico/backend/planilhas/atas.xlsx"
        );

        let matricula = 20260001;

        for (const nomeAba of workbook.SheetNames) {

            console.log(`\nProcessando turma: ${nomeAba}`);

            const aba = workbook.Sheets[nomeAba];

            const turmaTexto =
                aba["A6"]?.v || nomeAba;

            const nomeTurma =
                turmaTexto
                    .replace("TURMA:", "")
                    .trim()
                    .split("-")[0]
                    .trim();

            const turno =
                turmaTexto.includes("MANHÃ")
                    ? "Manhã"
                    : "Tarde";

            let turmaId;

            const [turmas] = await pool.execute(
                `
                SELECT id
                FROM turmas
                WHERE nome = ?
                `,
                [nomeTurma]
            );

            if (turmas.length > 0) {

                turmaId = turmas[0].id;

            } else {

                const [resultado] = await pool.execute(
                    `
                    INSERT INTO turmas
                    (
                        nome,
                        turno,
                        ano_letivo_id
                    )
                    VALUES
                    (?, ?, 1)
                    `,
                    [
                        nomeTurma,
                        turno
                    ]
                );

                turmaId = resultado.insertId;

            }

            for (let linha = 8; linha <= 341; linha++) {

                const numero =
                    aba["A" + linha]?.v;

                const nome =
                    aba["B" + linha]?.v;

                if (
                    numero === undefined ||
                    nome === undefined
                ) {
                    continue;
                }

                if (nome === "NOME") {
                    continue;
                }

                const matriculaAluno =
                    String(matricula++);

                const [alunoExistente] =
                    await pool.execute(
                        `
                        SELECT id
                        FROM alunos
                        WHERE nome = ?
                        `,
                        [nome]
                    );

                if (alunoExistente.length > 0) {
                    continue;
                }

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
                        matriculaAluno,
                        nome,
                        turmaId
                    ]
                );

                console.log(
                    "Aluno importado:",
                    nome
                );

            }

        }

        console.log(
            "\nIMPORTAÇÃO FINALIZADA!"
        );

        process.exit();

    } catch (error) {

        console.error(error);

    }

}

importar();