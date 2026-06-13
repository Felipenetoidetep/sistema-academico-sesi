import { useEffect, useState } from "react";
import axios from "axios";

function Disciplinas() {

    const [disciplinas, setDisciplinas] = useState([]);
    const [turmas, setTurmas] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [novaDisciplina, setNovaDisciplina] = useState({
        nome: "",
        carga_horaria: "",
        turma_id: ""
    });

    useEffect(() => {

        carregarDisciplinas();
        carregarTurmas();

    }, []);

    const carregarDisciplinas = () => {

        axios
            .get("http://localhost:3001/api/disciplinas")
            .then((response) => {

                setDisciplinas(response.data);

            })
            .catch((error) => {

                console.error(error);

            });

    };

    const carregarTurmas = () => {

        axios
            .get("http://localhost:3001/api/turmas")
            .then((response) => {

                setTurmas(response.data);

            })
            .catch((error) => {

                console.error(error);

            });

    };

    const salvarDisciplina = async () => {

        try {

            await axios.post(
                "http://localhost:3001/api/disciplinas",
                novaDisciplina
            );

            alert("Disciplina cadastrada com sucesso!");

            setNovaDisciplina({
                nome: "",
                carga_horaria: "",
                turma_id: ""
            });

            setMostrarFormulario(false);

            carregarDisciplinas();

        } catch (error) {

            console.error(error);

            alert("Erro ao cadastrar disciplina");

        }

    };

    return (

        <div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
                }}
            >

                <h2>📚 Gestão de Disciplinas</h2>

                <button
                    onClick={() =>
                        setMostrarFormulario(!mostrarFormulario)
                    }
                    style={{
                        backgroundColor: "#2563eb",
                        color: "#fff",
                        border: "none",
                        padding: "12px 20px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "600"
                    }}
                >
                    + Nova Disciplina
                </button>

            </div>

            {mostrarFormulario && (

                <div
                    style={{
                        backgroundColor: "#fff",
                        padding: "20px",
                        borderRadius: "16px",
                        marginBottom: "20px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
                    }}
                >

                    <h3
                        style={{
                            textAlign: "center",
                            marginBottom: "20px"
                        }}
                    >
                        Nova Disciplina
                    </h3>

                    <input
                        type="text"
                        placeholder="Nome da Disciplina"
                        value={novaDisciplina.nome}
                        onChange={(e) =>
                            setNovaDisciplina({
                                ...novaDisciplina,
                                nome: e.target.value
                            })
                        }
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "10px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1"
                        }}
                    />

                    <input
                        type="number"
                        placeholder="Carga Horária"
                        value={novaDisciplina.carga_horaria}
                        onChange={(e) =>
                            setNovaDisciplina({
                                ...novaDisciplina,
                                carga_horaria: e.target.value
                            })
                        }
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "10px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1"
                        }}
                    />

                    <select
                        value={novaDisciplina.turma_id}
                        onChange={(e) =>
                            setNovaDisciplina({
                                ...novaDisciplina,
                                turma_id: e.target.value
                            })
                        }
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "15px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1"
                        }}
                    >

                        <option value="">
                            Selecione uma turma
                        </option>

                        {
                            turmas.map((turma) => (

                                <option
                                    key={turma.id}
                                    value={turma.id}
                                >
                                    {turma.nome}
                                </option>

                            ))
                        }

                    </select>

                    <button
                        onClick={salvarDisciplina}
                        style={{
                            backgroundColor: "#16a34a",
                            color: "#fff",
                            border: "none",
                            padding: "12px 20px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontWeight: "600"
                        }}
                    >
                        Salvar Disciplina
                    </button>

                </div>

            )}

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
                }}
            >

                <thead
                    style={{
                        backgroundColor: "#2563eb",
                        color: "#fff"
                    }}
                >

                    <tr>

                        <th style={{ padding: "15px" }}>
                            Disciplina
                        </th>

                        <th style={{ padding: "15px" }}>
                            Carga Horária
                        </th>

                        <th style={{ padding: "15px" }}>
                            Turma
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        disciplinas.map((disciplina) => (

                            <tr
                                key={disciplina.id}
                                style={{
                                    textAlign: "center"
                                }}
                            >

                                <td style={{ padding: "15px" }}>
                                    {disciplina.nome}
                                </td>

                                <td style={{ padding: "15px" }}>
                                    {disciplina.carga_horaria}h
                                </td>

                                <td style={{ padding: "15px" }}>
                                    {disciplina.turma || "-"}
                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default Disciplinas;