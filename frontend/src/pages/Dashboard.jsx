import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
    GraduationCap,
    Users,
    School,
    BookOpen,
    CheckCircle,
    AlertTriangle,
    XCircle
} from "lucide-react";


function Dashboard() {

    const [dados, setDados] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        axios
            .get("https://sistema-academico-sesi-production.up.railway.app/api/dashboard")
            .then((response) => {

                setDados(response.data);

            })
            .catch((error) => {

                console.error(error);

            });

    }, []);

    if (!dados) {

        return <h2>Carregando Dashboard...</h2>;

    }

return (

    <div>

        <h2
            style={{
                color: "#0f172a",
                fontSize: "36px",
                marginBottom: "25px"
            }}
        >
            Dashboard Administrativo
        </h2>

        <div
            style={{
                display: "flex",
                gap: "25px",
                flexWrap: "wrap"
            }}
        >

            <div style={card}>
                <GraduationCap size={60} color="#2563eb" />
                <h2 style={numero}>{dados.alunos}</h2>
                <p style={titulo}>Alunos</p>
            </div>

            <div style={card}>
                <Users size={60} color="#2563eb" />
                <h2 style={numero}>{dados.professores}</h2>
                <p style={titulo}>Professores</p>
            </div>

            <div style={card}>
                <School size={60} color="#2563eb" />
                <h2 style={numero}>{dados.turmas}</h2>
                <p style={titulo}>Turmas</p>
            </div>

            <div style={card}>
                <BookOpen size={60} color="#2563eb" />
                <h2 style={numero}>{dados.disciplinas}</h2>
                <p style={titulo}>Disciplinas</p>
            </div>

            <div style={card}>
                <CheckCircle size={60} color="green" />
                <h2 style={numero}>{dados.aprovados}</h2>
                <p style={titulo}>Aprovados</p>
            </div>

            <div style={card}>
                <AlertTriangle size={60} color="orange" />
                <h2 style={numero}>{dados.recuperacao}</h2>
                <p style={titulo}>Recuperação</p>
            </div>

            <div style={card}>
                <XCircle size={60} color="red" />
                <h2 style={numero}>{dados.reprovados}</h2>
                <p style={titulo}>Reprovados</p>
            </div>

        </div>

    </div>

);

}

const card = {
    width: "260px",
    padding: "30px",
    borderRadius: "18px",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease"
};

const numero = {
    fontSize: "48px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "15px 0 5px 0"
};

const titulo = {
    color: "#64748b",
    fontSize: "20px",
    margin: 0
};

export default Dashboard;