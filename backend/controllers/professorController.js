const pool = require("../database/connection");

exports.listar = async (req, res) => {

    try {

        const [professores] = await pool.execute(`
            SELECT *
            FROM professores
            ORDER BY nome
        `);

        return res.json(professores);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao listar professores"
        });

    }

};

exports.buscarPorId = async (req, res) => {

    try {

        const { id } = req.params;

        const [professores] = await pool.execute(
            `
            SELECT *
            FROM professores
            WHERE id = ?
            `,
            [id]
        );

        if (professores.length === 0) {

            return res.status(404).json({
                erro: "Professor não encontrado"
            });

        }

        return res.json(professores[0]);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao buscar professor"
        });

    }

};

exports.criar = async (req, res) => {

    try {

        const {
            nome,
            email,
            telefone,
            especialidade
        } = req.body;

        await pool.execute(
            `
            INSERT INTO professores
            (
                nome,
                email,
                telefone,
                especialidade
            )
            VALUES
            (?, ?, ?, ?)
            `,
            [
                nome,
                email,
                telefone,
                especialidade
            ]
        );

        return res.status(201).json({
            mensagem: "Professor cadastrado com sucesso"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao cadastrar professor"
        });

    }

};

exports.atualizar = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nome,
            email,
            telefone,
            especialidade
        } = req.body;

        await pool.execute(
            `
            UPDATE professores
            SET
                nome = ?,
                email = ?,
                telefone = ?,
                especialidade = ?
            WHERE id = ?
            `,
            [
                nome,
                email,
                telefone,
                especialidade,
                id
            ]
        );

        return res.json({
            mensagem: "Professor atualizado com sucesso"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao atualizar professor"
        });

    }

};

exports.excluir = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.execute(
            `
            DELETE FROM professores
            WHERE id = ?
            `,
            [id]
        );

        return res.json({
            mensagem: "Professor excluído com sucesso"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao excluir professor"
        });

    }

};

exports.minhasTurmas = async (req, res) => {

    try {

        const usuarioId = req.usuario.id;

        const [dados] = await pool.execute(
            `
            SELECT
                t.id,
                t.nome AS turma,
                d.nome AS disciplina
            FROM professores p

            INNER JOIN professor_turma_disciplina ptd
                ON ptd.professor_id = p.id

            INNER JOIN turmas t
                ON t.id = ptd.turma_id

            INNER JOIN disciplinas d
                ON d.id = ptd.disciplina_id

            WHERE p.usuario_id = ?
            `,
            [usuarioId]
        );

        return res.json(dados);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao buscar turmas"
        });

    }

};