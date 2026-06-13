const pool = require("../database/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {

    try {

        const { email, senha } = req.body;

        const [usuarios] = await pool.execute(
            `
            SELECT
                u.id,
                u.nome,
                u.email,
                u.senha,
                p.nome as perfil
            FROM usuarios u
            INNER JOIN perfis p
                ON p.id = u.perfil_id
            WHERE u.email = ?
            AND u.ativo = true
            `,
            [email]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                erro: "Usuário não encontrado"
            });
        }

        const usuario = usuarios[0];

        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaValida) {
            return res.status(401).json({
                erro: "Senha inválida"
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                perfil: usuario.perfil
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h"
            }
        );

        return res.json({
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro interno"
        });
    }

};