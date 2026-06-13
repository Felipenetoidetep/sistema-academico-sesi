require("dotenv").config();

const pool = require("./database/connection");

async function testarConexao() {
  try {
    const conn = await pool.getConnection();

    console.log("✅ Conectado ao MySQL com sucesso!");

    conn.release();
    process.exit(0);

  } catch (error) {

    console.error("❌ Erro ao conectar:");
    console.error(error.message);

    process.exit(1);
  }
}

testarConexao();