import { useEffect, useState } from "react";
import axios from "axios";

function Alunos() {
    
    const [alunos, setAlunos] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [turmas, setTurmas] = useState([]);
    const [turmaSelecionada, setTurmaSelecionada] = useState("");

    const carregarAlunos = () => {

        axios
            .get("http:///api/alunos")
            .then((response) => {

                setAlunos(response.data);

            })
            .catch((error) => {

                console.error(error);

            });

    };

    useEffect(() => {

    carregarAlunos();

    axios
        .get("https://sistema-academico-sesi-production.up.railway.app/api/turmas")
        .then((response) => {

            setTurmas(response.data);

        })
        .catch((error) => {

            console.error(error);

        });

    }, []);

    const editarAluno = (id) => {

    window.location.href =
        `/editar-aluno/${id}`;

};
    const excluirAluno = async (id) => {

        const confirmar = window.confirm(
            "Deseja excluir este aluno?"
        );

        if (!confirmar) return;

        try {

            await axios.delete(
                `https://sistema-academico-sesi-production.up.railway.app/api/alunos/${id}`
            );

            alert("Aluno excluído com sucesso!");

            carregarAlunos();

        } catch (error) {

            console.error(error);

            alert("Erro ao excluir aluno");

        }

    };

    const alunosFiltrados = alunos.filter((aluno) => {

    const nomeOk =
        aluno.nome
            .toLowerCase()
            .includes(
                pesquisa.toLowerCase()
            );

    const turmaOk =
        turmaSelecionada === ""
        ||
        aluno.turma === turmaSelecionada;

    return nomeOk && turmaOk;

});

    return (

        <div>

            <h2>👨‍🎓 Alunos Cadastrados</h2>

            <input
                type="text"
                placeholder="Pesquisar aluno..."
                value={pesquisa}
                onChange={(e) =>
                    setPesquisa(e.target.value)
                }
                style={{
                    padding: "8px",
                    width: "300px",
                    marginBottom: "15px"
                }}
            />
            <select
                value={turmaSelecionada}
                onChange={(e) =>
                setTurmaSelecionada(
                e.target.value
                )
                }
                style={{
                marginLeft: "10px",
                padding: "8px"
                }}
>

    <option value="">
        Todas as Turmas
    </option>

    {
        turmas.map((turma) => (

            <option
                key={turma.id}
                value={turma.nome}
            >
                {turma.nome}
            </option>

        ))
    }

</select>

            <button
                onClick={carregarAlunos}
                style={{
                    marginLeft: "10px"
                }}
            >
                Atualizar
            </button>

            <table
                border="1"
                cellPadding="10"
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Matrícula</th>
                        <th>Nome</th>
                        <th>Turma</th>
                        <th>Ações</th>
                    </tr>

                </thead>

                <tbody>

                    {alunosFiltrados.map((aluno) => (

                        <tr key={aluno.id}>

                            <td>{aluno.id}</td>
                            <td>{aluno.matricula}</td>
                            <td>{aluno.nome}</td>
                            <td>{aluno.turma}</td>

                            <td>

                        
   
    <button
        onClick={() =>
            editarAluno(aluno.id)
        }
    >
        ✏️ Editar
    </button>

    <button
        onClick={() =>
            excluirAluno(aluno.id)
        }
        style={{
            marginLeft: "5px"
        }}
    >
        🗑️ Excluir
    </button>

</td>
                           
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Alunos;