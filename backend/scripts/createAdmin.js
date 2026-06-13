require("dotenv").config();

const bcrypt = require("bcryptjs");
const pool = require("../database/connection");

async function criarAdmin() {

    try {

        const senhaHash = await bcrypt.hash(
            "123456",
            10
        );

        await pool.execute(
            `
            INSERT INTO usuarios
            (
                nome,
                email,
                senha,
                perfil_id
            )
            VALUES
            (
                ?,
                ?,
                ?,
                ?
            )
            `,
            [
                "Administrador",
                "admin@idetep.com.br",
                senhaHash,
                1
            ]
        );

        console.log(
            "✅ Administrador criado com sucesso!"
        );

        process.exit();

    } catch (error) {

        console.error(error);

        process.exit();
    }

}

criarAdmin();