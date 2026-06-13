const pool = require("../database/connection");

exports.resumo = async (req, res) => {

    try {

        const [alunos] =
            await pool.execute(
                "SELECT COUNT(*) total FROM alunos"
            );

        const [professores] =
            await pool.execute(
                "SELECT COUNT(*) total FROM professores"
            );

        const [turmas] =
            await pool.execute(
                "SELECT COUNT(*) total FROM turmas"
            );

        const [disciplinas] =
            await pool.execute(
                "SELECT COUNT(*) total FROM disciplinas"
            );
const [aprovados] =
    await pool.execute(
        `
        SELECT COUNT(*) total
        FROM notas
        WHERE situacao = 'APROVADO'
        `
    );

const [recuperacao] =
    await pool.execute(
        `
        SELECT COUNT(*) total
        FROM notas
        WHERE situacao = 'RECUPERACAO'
        `
    );

const [reprovados] =
    await pool.execute(
        `
        SELECT COUNT(*) total
        FROM notas
        WHERE situacao = 'REPROVADO'
        `
    );
        return res.json({

    alunos: alunos[0].total,

    professores: professores[0].total,

    turmas: turmas[0].total,

    disciplinas: disciplinas[0].total,

    aprovados: aprovados[0].total,

    recuperacao: recuperacao[0].total,

    reprovados: reprovados[0].total

});

 } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao carregar dashboard"
        });

    }

};