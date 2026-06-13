module.exports = (...perfisPermitidos) => {

    return (req, res, next) => {

        const perfil = req.usuario.perfil;

        if (!perfisPermitidos.includes(perfil)) {

            return res.status(403).json({
                erro: "Acesso negado"
            });

        }

        next();

    };

};