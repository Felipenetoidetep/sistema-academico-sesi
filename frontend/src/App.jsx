import logoSesi from "./assets/logo_sesi.png";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";

import Alunos from "./pages/Alunos";
import ImportarAlunos from "./pages/ImportarAlunos";
import Professores from "./pages/Professores";
import Notas from "./pages/Notas";
import Boletim from "./pages/Boletim";
import LancarNotas from "./pages/LancarNotas";
import CadastrarAluno from "./pages/CadastrarAluno";
import EditarAluno from "./pages/EditarAluno";
import Disciplinas from "./pages/Disciplinas";
import Turmas from "./pages/Turmas";
import BoletimAluno from "./pages/BoletimAluno";
function App() {

    return (

        <div
    style={{
        display: "flex",
        fontFamily: "'Segoe UI', sans-serif",
        backgroundColor: "#f8fafc",
        minHeight: "100vh"
    }}
>

            <Menu />

            <div
                style={{
                    flex: 1,
                    padding: "20px"
                }}
            >

                <div
    style={{
        marginBottom: "25px"
    }}
>
    <div
    style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        marginBottom: "20px"
    }}
>
    <img
        src={logoSesi}
        alt="Logo SESI"
        style={{
            height: "55px"
        }}
    />

    <div>
        <h1
    style={{
        color: "#0f172a",
        marginBottom: "5px"
    }}
>
    Unidade Escada - PE
</h1>

        <p
            style={{
                margin: 0,
                color: "#64748b",
                fontSize: "18px"
            }}
        >
            
        </p>
    </div>
</div>

    <p
        style={{
            color: "#64748b"
        }}
    >
        Painel Administrativo Escolar
    </p>
</div>

    <Routes>

        <Route
            path="/"
            element={<Alunos />}
        />

        <Route
            path="/professores"
            element={<Professores />}
        />

        <Route
            path="/notas"
            element={<Notas />}
        />

        <Route
            path="/boletim"
            element={<Boletim />}
        />

        <Route
            path="/lancar-notas"
            element={<LancarNotas />}
        />

        <Route
            path="/cadastrar-aluno"
            element={<CadastrarAluno />}
        />

        <Route
            path="/editar-aluno/:id"
            element={<EditarAluno />}
        />

        <Route
            path="/importar-alunos"
            element={<ImportarAlunos />}
        />

        <Route
            path="/dashboard"
            element={<Dashboard />}
        />

        <Route
            path="/turmas"
            element={<Turmas />}
        />

        <Route
            path="/disciplinas"
            element={<Disciplinas />}
        />

        <Route
            path="/boletim-aluno/:alunoId"
            element={<BoletimAluno />}
/>

    </Routes>
 </div>

        </div>

    );

}

export default App;