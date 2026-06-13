const pool = require("../database/connection");

exports.buscarPorAluno = async (req, res) => {

    try {

        const { alunoId } = req.params;

        const [boletim] = await pool.execute(
            `
            SELECT

    a.nome AS aluno,

    t.nome AS turma,

    d.nome AS disciplina,

    n.u1_av1,
    n.u1_av2,
    n.u1_av3,
    n.u1_recuperacao,
    n.u1_media,

    n.u2_av1,
    n.u2_av2,
    n.u2_av3,
    n.u2_recuperacao,
    n.u2_media,

    n.u3_av1,
    n.u3_av2,
    n.u3_av3,
    n.u3_recuperacao,
    n.u3_media,

    n.u4_av1,
    n.u4_av2,
    n.u4_av3,
    n.u4_recuperacao,
    n.u4_media,

    n.media_anual,
    n.situacao

FROM notas n

INNER JOIN alunos a
    ON a.id = n.aluno_id

INNER JOIN disciplinas d
    ON d.id = n.disciplina_id

INNER JOIN turmas t
    ON t.id = a.turma_id

WHERE n.aluno_id = ?

ORDER BY d.nome
`,
            [alunoId]
        );

        return res.json(boletim);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao gerar boletim"
        });

    }

};