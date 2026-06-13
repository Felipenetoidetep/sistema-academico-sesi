import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditarAluno() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [matricula, setMatricula] = useState("");
    const [nome, setNome] = useState("");
    const [turmaId, setTurmaId] = useState("");

    const [turmas, setTurmas] = useState([]);

    useEffect(() => {

        carregarAluno();
        carregarTurmas();

    }, []);

    const carregarAluno = async () => {

        try {

            const response =
                await axios.get(
                    `https://sistema-academico-sesi-production.up.railway.app/api/alunos/${id}`
                );

            setMatricula(
                response.data.matricula
            );

            setNome(
                response.data.nome
            );

            setTurmaId(
                response.data.turma_id
            );

        } catch (error) {

            console.error(error);

        }

    };

    const carregarTurmas = async () => {

        try {

            const response =
                await axios.get(
                    "https://sistema-academico-sesi-production.up.railway.app/api/turmas"
                );

            setTurmas(
                response.data
            );

        } catch (error) {

            console.error(error);

        }

    };

    const salvar = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `https://sistema-academico-sesi-production.up.railway.app/api/alunos/${id}`,
                {
                    matricula,
                    nome,
                    turma_id: turmaId
                }
            );

            alert(
                "Aluno atualizado com sucesso!"
            );

            navigate("/");

        } catch (error) {

            console.error(error);

            alert(
                "Erro ao atualizar aluno"
            );

        }

    };

    return (

        <div>

            <h2>
                ✏️ Editar Aluno
            </h2>
            
            <form onSubmit={salvar}>

                <div>

                    <label>
                        Matrícula
                    </label>

                    <br />

                    <input
                        value={matricula}
                        onChange={(e) =>
                            setMatricula(
                                e.target.value
                            )
                        }
                    />

                </div>

                <br />

                <div>

                    <label>
                        Nome
                    </label>

                    <br />

                    <input
                        value={nome}
                        onChange={(e) =>
                            setNome(
                                e.target.value
                            )
                        }
                        style={{
                            width: "400px"
                        }}
                    />

                </div>

                <br />

                <div>

                    <label>
                        Turma
                    </label>

                    <br />

                    <select
                        value={turmaId}
                        onChange={(e) =>
                            setTurmaId(
                                e.target.value
                            )
                        }
                    >

                        {
                            turmas.map(
                                (turma) => (

                                    <option
                                        key={turma.id}
                                        value={turma.id}
                                    >

                                        {
                                            turma.nome
                                        }

                                    </option>

                                )
                            )
                        }

                    </select>

                </div>

                <br />

                <div
    style={{
        display: "flex",
        gap: "10px"
    }}
>

    <button
        type="button"
        onClick={() => navigate("/")}
    >
        ↩️ Voltar
    </button>

    <button type="submit">
        💾 Salvar
    </button>

</div>

            </form>

        </div>

    );

}

export default EditarAluno;