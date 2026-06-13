import { Link, useLocation } from "react-router-dom";

import logoSesi from "../assets/logo_sesi.png";

import {
    LayoutDashboard,
    GraduationCap,
    Users,
    FileText,
    ClipboardList,
    UserPlus,
    Upload,
    School
} from "lucide-react";

function Menu() {

    const location = useLocation();

    const menuItem = (path) => ({
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px 16px",
        marginBottom: "10px",
        borderRadius: "10px",
        textDecoration: "none",
        color: "#ffffff",
        backgroundColor:
            location.pathname === path
                ? "#2563eb"
                : "transparent",
        transition: "all 0.3s ease",
        fontSize: "17px",
        fontWeight: "500"
    });

    return (

        <div
            style={{
                width: "260px",
                backgroundColor: "#0f172a",
                color: "#fff",
                padding: "20px",
                minHeight: "100vh",
                boxSizing: "border-box",
                borderRight: "1px solid #1e293b"
            }}
        >

            <div
                style={{
                    textAlign: "center",
                    marginBottom: "35px"
                }}
            >
                <img
                    src={logoSesi}
                    alt="SESI"
                    style={{
                        width: "140px",
                        marginBottom: "10px"
                    }}
                />

                <h2
                    style={{
                        margin: 0,
                        fontSize: "22px"
                    }}
                >
                    Sistema Acadêmico
                </h2>

                <p
                    style={{
                        margin: "5px 0 0 0",
                        color: "#94a3b8",
                        fontSize: "14px"
                    }}
                >
                    Painel Administrativo
                </p>
            </div>

            <Link style={menuItem("/dashboard")} to="/dashboard">
                <LayoutDashboard size={20} />
                Dashboard
            </Link>

            <Link style={menuItem("/")} to="/">
                <GraduationCap size={20} />
                Alunos
            </Link>

            <Link style={menuItem("/professores")} to="/professores">
                <Users size={20} />
                Professores
            </Link>
            <Link style={menuItem("/disciplinas")} to="/disciplinas">
                📚 Disciplinas
            </Link>
            <Link style={menuItem("/notas")} to="/notas">
                <ClipboardList size={20} />
                Notas
            </Link>

            <Link style={menuItem("/boletim")} to="/boletim">
                <FileText size={20} />
                Boletim
            </Link>

            <Link style={menuItem("/lancar-notas")} to="/lancar-notas">
                <ClipboardList size={20} />
                Lançar Notas
            </Link>

            <Link style={menuItem("/cadastrar-aluno")} to="/cadastrar-aluno">
                <UserPlus size={20} />
                Cadastrar Aluno
            </Link>

            <Link style={menuItem("/turmas")} to="/turmas">
            <School size={20} />
             Turmas
            </Link>

            <Link to="/boletim">
    📄 Boletim
</Link>

            <Link style={menuItem("/importar-alunos")} to="/importar-alunos">
                <Upload size={20} />
                Importar Alunos
            </Link>

            

        </div>

    );

}

export default Menu;