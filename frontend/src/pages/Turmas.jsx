import { useEffect, useState } from "react";
import axios from "axios";

function Turmas() {

    const [turmas, setTurmas] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editandoId, setEditandoId] = useState(null);

    const [novaTurma, setNovaTurma] = useState({
        nome: "",
        turno: "Manhã",
        ano_letivo_id: 1
    });

    useEffect(() => {

        carregarTurmas();

    }, []);

    const carregarTurmas = () => {

        axios
            .get("https://sistema-academico-sesi-production.up.railway.app/api/turmas")
            .then((response) => {

                setTurmas(response.data);

            })
            .catch((error) => {

                console.error(error);

            });

    };
const salvarTurma = async () => {

    try {

        await axios.post(
            "https://sistema-academico-sesi-production.up.railway.app/api/turmas",
            novaTurma
        );

        alert("Turma cadastrada com sucesso!");

        setNovaTurma({
            nome: "",
            turno: "Manhã",
            ano_letivo_id: 1
        });

        setMostrarFormulario(false);

        carregarTurmas();

    } catch (error) {

        console.error(error);

        alert("Erro ao cadastrar turma");

    }

};

const excluirTurma = async (id) => {

    const confirmar = window.confirm(
        "Deseja excluir esta turma?"
    );

    if (!confirmar) {
        return;
    }

    try {

        await axios.delete(
            `https://sistema-academico-sesi-production.up.railway.app/api/turmas/${id}`
        );

        alert("Turma excluída com sucesso!");

        carregarTurmas();

    } catch (error) {

        console.error(error);

        alert("Erro ao excluir turma");

    }

};

const editarTurma = (turma) => {

    setNovaTurma({
        nome: turma.nome,
        turno: turma.turno,
        ano_letivo_id: turma.ano_letivo_id
    });

    setEditandoId(turma.id);

    setMostrarFormulario(true);

};

const atualizarTurma = async () => {

    try {

        await axios.put(
            `https://sistema-academico-sesi-production.up.railway.app/api/turmas/${editandoId}`,
            novaTurma
        );

        alert("Turma atualizada com sucesso!");

        setNovaTurma({
            nome: "",
            turno: "Manhã",
            ano_letivo_id: 1
        });

        setEditandoId(null);

        setMostrarFormulario(false);

        carregarTurmas();

    } catch (error) {

        console.error(error);

        alert("Erro ao atualizar turma");

    }

};

    return (

        <div>

            <h2
                style={{
                    textAlign: "center",
                    marginBottom: "20px"
                }}
            >
                🏫 Turmas
            </h2>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
                }}
            >

                <h2>🏫 Gestão de Turmas</h2>

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
                    + Nova Turma
                </button>

            </div>

            {
                mostrarFormulario && (

                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "16px",
                            marginBottom: "20px",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
                        }}
                    >

                        <h3>
    {editandoId ? "Editar Turma" : "Nova Turma"}
</h3>

                        <input
                            type="text"
                            placeholder="Nome da Turma"
                            value={novaTurma.nome}
                            onChange={(e) =>
                                setNovaTurma({
                                    ...novaTurma,
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

                        <select
                            value={novaTurma.turno}
                            onChange={(e) =>
                                setNovaTurma({
                                    ...novaTurma,
                                    turno: e.target.value
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
                            <option>Manhã</option>
                            <option>Tarde</option>
                            <option>Noite</option>
                        </select>

                        <button
    onClick={
        editandoId
            ? atualizarTurma
            : salvarTurma
    }
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
    {
        editandoId
            ? "Atualizar Turma"
            : "Salvar Turma"
    }
</button>

                    </div>

                )
            }

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
                            Nome
                        </th>

                        <th style={{ padding: "15px" }}>
                            Turno
                        </th>

                        <th style={{ padding: "15px" }}>
                            Ano Letivo
                        </th>

                        <th style={{ padding: "15px" }}>
                            Ações
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        turmas.map((turma) => (

                            <tr
                                key={turma.id}
                                style={{
                                    textAlign: "center"
                                }}
                            >

                                <td style={{ padding: "15px" }}>
                                    {turma.nome}
                                </td>

                                <td style={{ padding: "15px" }}>
                                    {turma.turno}
                                </td>

                                <td style={{ padding: "15px" }}>
                                    {turma.ano_letivo}
                                </td>

                                <td style={{ padding: "15px" }}>

                                    <button
    onClick={() => editarTurma(turma)}
    style={{
        marginRight: "10px",
        backgroundColor: "#f59e0b",
        color: "#fff",
        border: "none",
        padding: "8px 12px",
        borderRadius: "8px",
        cursor: "pointer"
    }}
>
    ✏️
</button>

                                    <button
    onClick={() => excluirTurma(turma.id)}
    style={{
        backgroundColor: "#ef4444",
        color: "#fff",
        border: "none",
        padding: "8px 12px",
        borderRadius: "8px",
        cursor: "pointer"
    }}
>
    🗑️
</button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default Turmas;