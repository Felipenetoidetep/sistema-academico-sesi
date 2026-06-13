const pool = require("../database/connection");

exports.listar = async (req, res) => {

  try {

    const [turmas] = await pool.execute(`
      SELECT
        t.*,
        a.descricao as ano_letivo
      FROM turmas t
      INNER JOIN anos_letivos a
      ON a.id = t.ano_letivo_id
      ORDER BY t.nome
    `);

    return res.json(turmas);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      erro: "Erro ao listar turmas"
    });

  }

};
exports.excluir = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.execute(
            `
            DELETE FROM turmas
            WHERE id = ?
            `,
            [id]
        );

        return res.json({
            mensagem: "Turma excluída com sucesso"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao excluir turma"
        });

    }

};
exports.criar = async (req, res) => {

  try {

    const {
      nome,
      turno,
      ano_letivo_id
    } = req.body;

    await pool.execute(
      `
      INSERT INTO turmas
      (
        nome,
        turno,
        ano_letivo_id
      )
      VALUES
      (?, ?, ?)
      `,
      [
        nome,
        turno,
        ano_letivo_id
      ]
    );

    return res.status(201).json({
      mensagem: "Turma criada com sucesso"
    });

  } catch (error) {

  console.log("=================================");
  console.log("ERRO AO CRIAR TURMA");
  console.log("=================================");
  console.log(error);
  console.log("MESSAGE:", error.message);
  console.log("CODE:", error.code);
  console.log("SQL MESSAGE:", error.sqlMessage);
  console.log("=================================");

  return res.status(500).json({
    erro: "Erro ao criar turma"
  });

}

};

exports.atualizar = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nome,
            turno,
            ano_letivo_id
        } = req.body;

        await pool.execute(
            `
            UPDATE turmas
            SET
                nome = ?,
                turno = ?,
                ano_letivo_id = ?
            WHERE id = ?
            `,
            [
                nome,
                turno,
                ano_letivo_id,
                id
            ]
        );

        return res.json({
            mensagem: "Turma atualizada com sucesso"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao atualizar turma"
        });

    }

};