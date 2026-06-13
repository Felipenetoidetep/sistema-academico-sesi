console.log("SERVER CERTO CARREGADO");
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const turmaRoutes = require("./routes/turmaRoutes");
const disciplinaRoutes = require("./routes/disciplinaRoutes");
const alunoRoutes = require("./routes/alunoRoutes");
const professorRoutes = require("./routes/professorRoutes");
const professorTurmaRoutes = require("./routes/professorTurmaRoutes");
const notaRoutes = require("./routes/notaRoutes");
const boletimRoutes = require("./routes/boletimRoutes");
const importacaoRoutes = require("./routes/importacaoRoutes");
const dashboardRoutes =  require("./routes/dashboardRoutes");
const app = express();
app.get("/teste-chatgpt", (req, res) => {
    res.send("TESTE CHATGPT");
});

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", turmaRoutes);
app.use("/api", disciplinaRoutes);
app.use("/api", alunoRoutes);
app.use("/api", professorRoutes);
app.use("/api", professorTurmaRoutes);
app.use("/api", notaRoutes);
app.use("/api", boletimRoutes);
app.use("/api", importacaoRoutes);
app.use("/api", dashboardRoutes);

app.get("/", (req, res) => {
    res.send("Sistema Acadêmico SESI - API Online");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});

setInterval(() => {
    console.log("Servidor ativo:", new Date().toLocaleTimeString());
}, 10000);