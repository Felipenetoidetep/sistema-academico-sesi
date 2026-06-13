const pool = require("../database/connection");

exports.listar = async (req, res) => {

    try {

        const [disciplinas] = await pool.execute(`
            SELECT
                d.*,
                t.nome AS turma
            FROM disciplinas d
            LEFT JOIN turmas t
                ON t.id = d.turma_id
            ORDER BY d.nome
        `);

        return res.json(disciplinas);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao listar disciplinas"
        });

    }

};

exports.criar = async (req, res) => {

    try {

        const {
            nome,
            carga_horaria,
            turma_id
        } = req.body;

        await pool.execute(
            `
            INSERT INTO disciplinas
            (
                nome,
                carga_horaria,
                turma_id
            )
            VALUES
            (?, ?, ?)
            `,
            [
                nome,
                carga_horaria,
                turma_id
            ]
        );

        return res.status(201).json({
            mensagem: "Disciplina criada com sucesso"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao criar disciplina"
        });

    }

};

  
exports.atualizar = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nome,
            carga_horaria,
            turma_id
        } = req.body;

        await pool.execute(
            `
            UPDATE disciplinas
            SET
                nome = ?,
                carga_horaria = ?,
                turma_id = ?
            WHERE id = ?
            `,
            [
                nome,
                carga_horaria,
                turma_id,
                id
            ]
        );

        return res.json({
            mensagem: "Disciplina atualizada com sucesso"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao atualizar disciplina"
        });

    }

};
exports.listarPorTurma = async (req, res) => {

    try {

        const { turma_id } = req.params;

        const [disciplinas] = await pool.execute(
            `
            SELECT *
            FROM disciplinas
            WHERE turma_id = ?
            ORDER BY nome
            `,
            [turma_id]
        );

        return res.json(disciplinas);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao buscar disciplinas"
        });

    }

};
exports.excluir = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.execute(
            `
            DELETE FROM disciplinas
            WHERE id = ?
            `,
            [id]
        );

        return res.json({
            mensagem: "Disciplina excluída com sucesso"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao excluir disciplina"
        });

    }

};