const pool = require("../database/connection");

exports.listar = async (req, res) => {

    try {

        const [vinculos] = await pool.execute(`
            SELECT
                pt.id,
                p.nome AS professor,
                t.nome AS turma,
                d.nome AS disciplina
            FROM professor_turma pt
            INNER JOIN professores p
                ON p.id = pt.professor_id
            INNER JOIN turmas t
                ON t.id = pt.turma_id
            INNER JOIN disciplinas d
                ON d.id = pt.disciplina_id
            ORDER BY p.nome
        `);

        return res.json(vinculos);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao listar vínculos"
        });

    }

};

exports.criar = async (req, res) => {

    try {

        const {
            professor_id,
            turma_id,
            disciplina_id
        } = req.body;

        await pool.execute(
            `
            INSERT INTO professor_turma
            (
                professor_id,
                turma_id,
                disciplina_id
            )
            VALUES
            (?, ?, ?)
            `,
            [
                professor_id,
                turma_id,
                disciplina_id
            ]
        );

        return res.status(201).json({
            mensagem: "Vínculo criado com sucesso"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao criar vínculo"
        });

    }

};