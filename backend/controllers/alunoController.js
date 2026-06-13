const pool = require("../database/connection");

exports.listar = async (req, res) => {

    try {

        const [alunos] = await pool.execute(`
            SELECT
                a.*,
                t.nome as turma
            FROM alunos a
            LEFT JOIN turmas t
            ON t.id = a.turma_id
            ORDER BY a.nome
        `);

        return res.json(alunos);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao listar alunos"
        });

    }

};

exports.criar = async (req, res) => {

    try {

        const {
            matricula,
            nome,
            turma_id
        } = req.body;

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
                matricula,
                nome,
                turma_id
            ]
        );

        return res.status(201).json({
            mensagem: "Aluno cadastrado com sucesso"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao cadastrar aluno"
        });

    }

};

exports.buscarPorId = async (req, res) => {

    try {

        const { id } = req.params;

        const [alunos] = await pool.execute(
            `
            SELECT
                a.*,
                t.nome as turma
            FROM alunos a
            LEFT JOIN turmas t
            ON t.id = a.turma_id
            WHERE a.id = ?
            `,
            [id]
        );

        if (alunos.length === 0) {
            return res.status(404).json({
                erro: "Aluno não encontrado"
            });
        }

        return res.json(alunos[0]);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao buscar aluno"
        });

    }

};

exports.atualizar = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            matricula,
            nome,
            turma_id
        } = req.body;

        await pool.execute(
            `
            UPDATE alunos
            SET
                matricula = ?,
                nome = ?,
                turma_id = ?
            WHERE id = ?
            `,
            [
                matricula,
                nome,
                turma_id,
                id
            ]
        );

        return res.json({
            mensagem: "Aluno atualizado com sucesso"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao atualizar aluno"
        });

    }

};
exports.listarPorTurma = async (req, res) => {

    try {

        const { turma_id } = req.params;

        const [alunos] = await pool.execute(
            `
            SELECT *
            FROM alunos
            WHERE turma_id = ?
            ORDER BY nome
            `,
            [turma_id]
        );

        return res.json(alunos);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao buscar alunos"
        });

    }

};
exports.excluir = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.execute(
            `
            DELETE FROM alunos
            WHERE id = ?
            `,
            [id]
        );

        return res.json({
            mensagem: "Aluno excluído com sucesso"
        });

    } catch (error) {

        console.error("ERRO COMPLETO:");
        console.error(error);
        console.error(error.message);

        return res.status(500).json({
            erro: error.message
        });

    }

};
exports.buscarPorMatricula = async (req, res) => {

    try {

        const { matricula } = req.params;

        const [alunos] = await pool.execute(
            `
            SELECT *
            FROM alunos
            WHERE matricula = ?
            `,
            [matricula]
        );

        if (alunos.length === 0) {

            return res.status(404).json({
                erro: "Aluno não encontrado"
            });

        }

        return res.json(alunos[0]);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao buscar aluno"
        });

    }

};

 exports.buscarAluno = async (req, res) => {

    try {

        const { busca } = req.params;

        const [alunos] = await pool.execute(
            `
            SELECT *
            FROM alunos
            WHERE matricula = ?
            OR nome LIKE ?
            LIMIT 1
            `,
            [
                busca,
                `%${busca}%`
            ]
        );

        if (alunos.length === 0) {

            return res.status(404).json({
                erro: "Aluno não encontrado"
            });

        }

        return res.json(alunos[0]);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao buscar aluno"
        });

    }

}; 