import { useEffect, useState } from "react";
import axios from "axios";

function CadastrarAluno() {

    const [matricula, setMatricula] = useState("");
    const [nome, setNome] = useState("");

    const [turmas, setTurmas] = useState([]);
    const [turmaId, setTurmaId] = useState("");

    useEffect(() => {

        axios
            .get("http://localhost:3001/api/turmas")
            .then((response) => {

                setTurmas(response.data);

                if (response.data.length > 0) {
                    setTurmaId(response.data[0].id);
                }

            })
            .catch((error) => {

                console.error(error);

            });

    }, []);

    const salvar = async () => {

        try {

            await axios.post(
                "http://localhost:3001/api/alunos",
                {
                    matricula,
                    nome,
                    turma_id: turmaId
                }
            );

            alert("Aluno cadastrado com sucesso!");

            setMatricula("");
            setNome("");

        } catch (error) {

            console.error(error);

            alert("Erro ao cadastrar aluno");

        }

    };

    return (

        <div>

            <h2>➕ Cadastrar Aluno</h2>

            <p>Matrícula</p>

            <input
                value={matricula}
                onChange={(e) =>
                    setMatricula(e.target.value)
                }
            />

            <br /><br />

            <p>Nome</p>

            <input
                value={nome}
                onChange={(e) =>
                    setNome(e.target.value)
                }
            />

            <br /><br />

            <p>Turma</p>

            <select
                value={turmaId}
                onChange={(e) =>
                    setTurmaId(e.target.value)
                }
            >

                {turmas.map((turma) => (

                    <option
                        key={turma.id}
                        value={turma.id}
                    >
                        {turma.nome}
                    </option>

                ))}

            </select>

            <br /><br />

            <button onClick={salvar}>
                Salvar
            </button>

        </div>

    );

}

export default CadastrarAluno;