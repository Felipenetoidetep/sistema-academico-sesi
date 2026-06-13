const pool = require("../database/connection");

exports.listar = async (req, res) => {


try {

    const [notas] = await pool.execute(`
        SELECT
            n.*,
            a.nome AS aluno,
            d.nome AS disciplina
        FROM notas n
        INNER JOIN alunos a
            ON a.id = n.aluno_id
        INNER JOIN disciplinas d
            ON d.id = n.disciplina_id
        ORDER BY a.nome
    `);

    return res.json(notas);

} catch (error) {

    console.error(error);

    return res.status(500).json({
        erro: "Erro ao listar notas"
    });

}


};

exports.buscarPorId = async (req, res) => {


try {

    const { id } = req.params;

    const [notas] = await pool.execute(
        `
        SELECT
            n.*,
            a.nome AS aluno,
            d.nome AS disciplina
        FROM notas n
        INNER JOIN alunos a
            ON a.id = n.aluno_id
        INNER JOIN disciplinas d
            ON d.id = n.disciplina_id
        WHERE n.id = ?
        `,
        [id]
    );

    if (notas.length === 0) {

        return res.status(404).json({
            erro: "Nota não encontrada"
        });

    }

    return res.json(notas[0]);

} catch (error) {

    console.error(error);

    return res.status(500).json({
        erro: "Erro ao buscar nota"
    });

}


};

exports.criar = async (req, res) => {

    try {

        const {
            aluno_id,
            disciplina_id,
            u1_av1,
            u1_av2,
            u1_av3,
            u1_recuperacao,
            u1_media_final,
            situacao
        } = req.body;

        const u1_media =
            (
                Number(u1_av1 || 0) +
                Number(u1_av2 || 0) +
                Number(u1_av3 || 0)
            ) / 3;

        const [registro] = await pool.execute(
            `
            SELECT *
            FROM notas
            WHERE aluno_id = ?
            AND disciplina_id = ?
            `,
            [
                aluno_id,
                disciplina_id
            ]
        );

        if (registro.length > 0) {

            await pool.execute(
                `
                UPDATE notas
                SET
                    u1_av1 = ?,
                    u1_av2 = ?,
                    u1_av3 = ?,
                    u1_media = ?,
                    u1_recuperacao = ?,
                    u1_media_final = ?,
                    situacao = ?
                WHERE aluno_id = ?
                AND disciplina_id = ?
                `,
                [
                    u1_av1,
                    u1_av2,
                    u1_av3,
                    u1_media,
                    u1_recuperacao,
                    u1_media_final,
                    situacao,
                    aluno_id,
                    disciplina_id
                ]
            );

            return res.json({
                mensagem: "Notas atualizadas com sucesso"
            });

        }

        await pool.execute(
            `
            INSERT INTO notas
            (
                aluno_id,
                disciplina_id,
                u1_av1,
                u1_av2,
                u1_av3,
                u1_media,
                u1_recuperacao,
                u1_media_final,
                situacao
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                aluno_id,
                disciplina_id,
                u1_av1,
                u1_av2,
                u1_av3,
                u1_media,
                u1_recuperacao,
                u1_media_final,
                situacao
            ]
        );

        return res.status(201).json({
            mensagem: "Notas cadastradas com sucesso"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao salvar notas"
        });

    }

};
exports.atualizar = async (req, res) => {


try {

    const { id } = req.params;

    const [registros] = await pool.execute(
        `
        SELECT *
        FROM notas
        WHERE id = ?
        `,
        [id]
    );

    if (registros.length === 0) {

        return res.status(404).json({
            erro: "Nota não encontrada"
        });

    }

    const notaAtual = registros[0];

    const dados = {
        ...notaAtual,
        ...req.body
    };

    const calcularMedia = (a, b, c) => {

        if (
            a == null ||
            b == null ||
            c == null
        ) {
            return null;
        }

        return (
            Number(a) +
            Number(b) +
            Number(c)
        ) / 3;

    };

    const u1_media = calcularMedia(
        dados.u1_av1,
        dados.u1_av2,
        dados.u1_av3
    );

    const u2_media = calcularMedia(
        dados.u2_av1,
        dados.u2_av2,
        dados.u2_av3
    );

    const u3_media = calcularMedia(
        dados.u3_av1,
        dados.u3_av2,
        dados.u3_av3
    );

    const u4_media = calcularMedia(
        dados.u4_av1,
        dados.u4_av2,
        dados.u4_av3
    );

    let media_anual = null;
    let situacao = null;

    if (
    u1_media !== null &&
    u2_media !== null &&
    u3_media !== null &&
    u4_media !== null
) {

    media_anual =
        (
            u1_media +
            u2_media +
            u3_media +
            u4_media
        ) / 4;

    if (media_anual >= 7) {

        situacao = "APROVADO";

    } else if (media_anual >= 5) {

        situacao = "RECUPERACAO";

    } else {

        situacao = "REPROVADO";

    }

}

    await pool.execute(
        `
        UPDATE notas
        SET
            u1_av1 = ?,
            u1_av2 = ?,
            u1_av3 = ?,
            u1_media = ?,

            u2_av1 = ?,
            u2_av2 = ?,
            u2_av3 = ?,
            u2_media = ?,

            u3_av1 = ?,
            u3_av2 = ?,
            u3_av3 = ?,
            u3_media = ?,

            u4_av1 = ?,
            u4_av2 = ?,
            u4_av3 = ?,
            u4_media = ?,

            media_anual = ?,
            situacao = ?

        WHERE id = ?
        `,
        [
            dados.u1_av1,
            dados.u1_av2,
            dados.u1_av3,
            u1_media,

            dados.u2_av1,
            dados.u2_av2,
            dados.u2_av3,
            u2_media,

            dados.u3_av1,
            dados.u3_av2,
            dados.u3_av3,
            u3_media,

            dados.u4_av1,
            dados.u4_av2,
            dados.u4_av3,
            u4_media,

            media_anual,
            situacao,

            id
        ]
    );

    return res.json({
        mensagem: "Notas atualizadas com sucesso",
        media_anual,
        situacao
    });

} catch (error) {

    console.error(error);

    return res.status(500).json({
        erro: "Erro ao atualizar notas"
    });

}


};

exports.recuperacao = async (req, res) => {


try {

    const { id } = req.params;
    const { recuperacao_final } = req.body;

    const [registros] = await pool.execute(
        `
        SELECT *
        FROM notas
        WHERE id = ?
        `,
        [id]
    );

    if (registros.length === 0) {

        return res.status(404).json({
            erro: "Nota não encontrada"
        });

    }

    const nota = registros[0];

    const media_anual =
        Number(nota.media_anual || 0);

    const nota_final = Math.max(
        media_anual,
        Number(recuperacao_final)
    );

    const situacao =
        nota_final >= 6
            ? "APROVADO"
            : "REPROVADO";

    await pool.execute(
        `
        UPDATE notas
        SET
            recuperacao_final = ?,
            nota_final = ?,
            situacao = ?
        WHERE id = ?
        `,
        [
            recuperacao_final,
            nota_final,
            situacao,
            id
        ]
    );

    return res.json({
        mensagem: "Recuperação lançada com sucesso",
        nota_final,
        situacao
    });

} catch (error) {

    console.error(error);

    return res.status(500).json({
        erro: "Erro ao lançar recuperação"
    });

}


};

exports.lancarNotas = async (req, res) => {

    try {

        const {
            disciplina_id,
            unidade,
            avaliacao,
            notas
        } = req.body;

        const campo = `${unidade}_${avaliacao}`;

        for (const item of notas) {

            const [registro] = await pool.execute(
                `
                SELECT *
                FROM notas
                WHERE aluno_id = ?
                AND disciplina_id = ?
                `,
                [
                    item.aluno_id,
                    disciplina_id
                ]
            );

            if (registro.length > 0) {

                await pool.execute(
                    `
                    UPDATE notas
                    SET ${campo} = ?
                    WHERE aluno_id = ?
                    AND disciplina_id = ?
                    `,
                    [
                        item.nota,
                        item.aluno_id,
                        disciplina_id
                    ]
                );

            } else {

                await pool.execute(
                    `
                    INSERT INTO notas
                    (
                        aluno_id,
                        disciplina_id,
                        ${campo}
                    )
                    VALUES
                    (?, ?, ?)
                    `,
                    [
                        item.aluno_id,
                        disciplina_id,
                        item.nota
                    ]
                );

            }

            // BUSCA A NOTA ATUALIZADA

            const [dadosNota] = await pool.execute(
                `
                SELECT *
                FROM notas
                WHERE aluno_id = ?
                AND disciplina_id = ?
                `,
                [
                    item.aluno_id,
                    disciplina_id
                ]
            );

            const nota = dadosNota[0];

            const av1 =
                nota[`${unidade}_av1`];

            const av2 =
                nota[`${unidade}_av2`];

            const av3 =
                nota[`${unidade}_av3`];

            if (
                av1 !== null &&
                av2 !== null &&
                av3 !== null
            ) {

                const media =
                    (
                        Number(av1) +
                        Number(av2) +
                        Number(av3)
                    ) / 3;

                await pool.execute(
                    `
                    UPDATE notas
                    SET ${unidade}_media = ?
                    WHERE aluno_id = ?
                    AND disciplina_id = ?
                    `,
                    [
                        media,
                        item.aluno_id,
                        disciplina_id
                    ]
                );

            }

            // RECALCULA MÉDIA ANUAL

            const [notaAtualizada] =
                await pool.execute(
                    `
                    SELECT *
                    FROM notas
                    WHERE aluno_id = ?
                    AND disciplina_id = ?
                    `,
                    [
                        item.aluno_id,
                        disciplina_id
                    ]
                );

            const dados =
                notaAtualizada[0];

            if (
                dados.u1_media !== null &&
                dados.u2_media !== null &&
                dados.u3_media !== null &&
                dados.u4_media !== null
            ) {

                const mediaAnual =
                    (
                        Number(dados.u1_media) +
                        Number(dados.u2_media) +
                        Number(dados.u3_media) +
                        Number(dados.u4_media)
                    ) / 4;

                let situacao = "";

if (mediaAnual >= 7) {

    situacao = "APROVADO";

} else if (mediaAnual >= 5) {

    situacao = "RECUPERACAO";

} else {

    situacao = "REPROVADO";

}

                await pool.execute(
                    `
                    UPDATE notas
                    SET
                        media_anual = ?,
                        situacao = ?
                    WHERE aluno_id = ?
                    AND disciplina_id = ?
                    `,
                    [
                        mediaAnual,
                        situacao,
                        item.aluno_id,
                        disciplina_id
                    ]
                );

            }

        }

        return res.json({
            mensagem: "Notas lançadas com sucesso"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao lançar notas"
        });

    }

};
exports.buscarPorDisciplina = async (req, res) => {

    try {

        const { disciplinaId } = req.params;

        const [notas] = await pool.execute(
            `
            SELECT
                aluno_id,
                disciplina_id,
                u1_av1,
                u1_av2,
                u1_av3,
                u2_av1,
                u2_av2,
                u2_av3,
                u3_av1,
                u3_av2,
                u3_av3,
                u4_av1,
                u4_av2,
                u4_av3
            FROM notas
            WHERE disciplina_id = ?
            `,
            [disciplinaId]
        );

        return res.json(notas);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao buscar notas"
        });

    }

};
exports.boletimAluno = async (req, res) => {

    try {

        const { alunoId } = req.params;

        const [boletim] = await pool.execute(
            `
            SELECT

                a.nome AS aluno,

                t.nome AS turma,

                d.nome AS disciplina,

                n.u1_media,
                n.u2_media,
                n.u3_media,
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
