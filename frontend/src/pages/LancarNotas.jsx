import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function LancarNotas() {


const [turmas, setTurmas] = useState([]);
const [disciplinas, setDisciplinas] = useState([]);
const [alunos, setAlunos] = useState([]);

const [turmaId, setTurmaId] = useState("");
const [disciplinaId, setDisciplinaId] = useState("");
const [unidade, setUnidade] = useState("u1");
const [avaliacao, setAvaliacao] = useState("av1");
const [notas, setNotas] = useState({});
const [recuperacoes, setRecuperacoes] = useState({});
const [notasExistentes, setNotasExistentes] = useState([]);

useEffect(() => {

    carregarTurmas();
    carregarDisciplinas();

}, []);

const carregarTurmas = async () => {

    try {

        const response =
            await axios.get(
                "https://sistema-academico-sesi-production.up.railway.app/api/turmas"
            );

        setTurmas(response.data);

    } catch (error) {

        console.error(
            "Erro ao carregar turmas:",
            error
        );

    }

};

const carregarDisciplinas = async () => {

    try {

        const response =
            await axios.get(
                "https://sistema-academico-sesi-production.up.railway.app/api/disciplinas"
            );

        setDisciplinas(response.data);

    } catch (error) {

        console.error(
            "Erro ao carregar disciplinas:",
            error
        );

    }

};

const carregarAlunos = async () => {

    console.log("BOTÃO CLICADO");

    if (!turmaId) {

        alert("Selecione uma turma");
        return;

    }

    try {

        const alunosResponse =
            await axios.get(
                `https://sistema-academico-sesi-production.up.railway.app/api/alunos/turma/${turmaId}`
            );

        setAlunos(alunosResponse.data);

        if (disciplinaId) {

            const notasResponse =
                await axios.get(
                    `https://sistema-academico-sesi-production.up.railway.app/api/notas/disciplina/${disciplinaId}`
                );

            setNotasExistentes(
                notasResponse.data
            );

            const notasCarregadas = {};

notasResponse.data.forEach((nota) => {

    notasCarregadas[nota.aluno_id] = {

        av1: nota[`${unidade}_av1`] || "",
        av2: nota[`${unidade}_av2`] || "",
        av3: nota[`${unidade}_av3`] || ""

    };

});

            setNotas(
                notasCarregadas
            );

        }

    } catch (error) {

        console.error(error);

    }

};

const alterarNota = (alunoId, valor) => {

    setNotas({
        ...notas,
        [alunoId]: valor
    });

};

const salvarNotas = async () => {

    if (!disciplinaId) {

        alert(
            "Selecione uma disciplina"
        );

        return;

    }

    try {

        const listaNotas =
            alunos.map((aluno) => ({

                aluno_id: aluno.id,
                nota: notas[aluno.id] || null

            }));

        await axios.post(
    "https://sistema-academico-sesi-production.up.railway.app/api/notas/lancar",
    {
        disciplina_id: disciplinaId,
        unidade,
        avaliacao,
        notas: listaNotas
    }
);

        alert(
            "Notas lançadas com sucesso!"
        );

    } catch (error) {

        console.error(error);

        alert(
            "Erro ao salvar notas"
        );

    }

};
const salvarAluno = async (alunoId) => {

    try {

        const media =
            (
                Number(notas[alunoId]?.av1 || 0) +
                Number(notas[alunoId]?.av2 || 0) +
                Number(notas[alunoId]?.av3 || 0)
            ) / 3;

        const recuperacao =
            Number(
                recuperacoes[alunoId] || 0
            );

        const notaFinal =
            Math.max(
                media,
                recuperacao
            );

        let situacao = "REPROVADO";

        if (notaFinal >= 7) {

            situacao = "APROVADO";

        } else if (notaFinal >= 5) {

            situacao = "RECUPERACAO";

        }

        await axios.post(
            "https://sistema-academico-sesi-production.up.railway.app/api/notas",
            {
                aluno_id: alunoId,
                disciplina_id: disciplinaId,

                u1_av1:
                    notas[alunoId]?.av1 || null,

                u1_av2:
                    notas[alunoId]?.av2 || null,

                u1_av3:
                    notas[alunoId]?.av3 || null,

                u1_media: media,

                u1_recuperacao:
                    recuperacao,

                u1_media_final:
                    notaFinal,

                situacao
            }
        );

        alert(
            "Aluno salvo com sucesso!"
        );

    } catch (error) {

        console.error(error);

        alert(
            "Erro ao salvar aluno"
        );

    }

};

const gerarPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(16);

    doc.text(
        "SESI Unidade Escada - PE",
        14,
        15
    );

    doc.setFontSize(12);

    const nomeTurma =
        turmas.find(
            t => t.id == turmaId
        )?.nome || "";

    const nomeDisciplina =
        disciplinas.find(
            d => d.id == disciplinaId
        )?.nome || "";

    doc.text(
        `Turma: ${nomeTurma}`,
        14,
        25
    );

    doc.text(
        `Disciplina: ${nomeDisciplina}`,
        14,
        32
    );

    const dados = alunos.map(
        (aluno) => {

            const media =
                (
                    Number(notas[aluno.id]?.av1 || 0) +
                    Number(notas[aluno.id]?.av2 || 0) +
                    Number(notas[aluno.id]?.av3 || 0)
                ) / 3;

            const recuperacao =
                Number(
                    recuperacoes[aluno.id] || 0
                );

            const final =
                Math.max(
                    media,
                    recuperacao
                );

            let situacao =
    "NÃO AVALIADO";

if (media > 0) {

    if (final >= 6) {

        situacao =
            "APROVADO";

    } else if (
        recuperacao > 0
    ) {

        situacao =
            "REPROVADO";

    } else {

        situacao =
            "RECUPERAÇÃO";

    }

}

            return [
                aluno.matricula,
                aluno.nome,
                media.toFixed(1),
                recuperacao || "-",
                final.toFixed(1),
                situacao
            ];

        }
    );

    autoTable(doc, {
        head: [[
            "Matrícula",
            "Aluno",
            "Média",
            "Recuperação",
            "Final",
            "Situação"
        ]],
        body: dados,
        startY: 40
    });

    doc.save(
        `relatorio_turma_${nomeTurma}.pdf`
    );

};
return (

    <div>

        <h2>
            📝 Lançar Notas
        </h2>

        <br />

        <select
    value={turmaId}
    onChange={(e) => {

    setTurmaId(
        e.target.value
    );

}}

        >

            <option value="">
                Selecione a Turma
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
<select
    value={unidade}
    onChange={(e) =>
        setUnidade(e.target.value)
    }
>

    <option value="u1">U1</option>
    <option value="u2">U2</option>
    <option value="u3">U3</option>
    <option value="u4">U4</option>

</select>

<select
    value={avaliacao}
    onChange={(e) =>
        setAvaliacao(e.target.value)
    }
    style={{
        marginLeft: "10px"
    }}
>

    <option value="av1">AV1</option>
    <option value="av2">AV2</option>
    <option value="av3">AV3</option>

</select>
        <select
            value={disciplinaId}
            onChange={(e) =>
                setDisciplinaId(
                    e.target.value
                )
            }
            style={{
                marginLeft: "10px"
            }}
        >

            <option value="">
                Selecione a Disciplina
            </option>

            {
                disciplinas.map((disciplina) => (

                    <option
                        key={disciplina.id}
                        value={disciplina.id}
                    >
                        {disciplina.nome}
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
            Buscar Alunos
        </button>

        <br />

<button
    onClick={gerarPDF}
    style={{
        marginLeft: "10px"
    }}
>
    📄 Gerar Relatório
</button>

        <br />

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

                    <th>
                        Matrícula
                    </th>

                    <th>
                        Aluno
                    </th>

                    <th>AV1</th>
<th>AV2</th>
<th>AV3</th>
<th>Média</th>
<th>Recuperação</th>
<th>Final</th>
<th>Situação</th>
<th>Salvar</th>
</tr>

            </thead>

            <tbody>

                {
                    alunos.map((aluno) => (

                        <tr key={aluno.id}>

                            <td>
                                {aluno.matricula}
                            </td>

                            <td>
                                {aluno.nome}
                            </td>

                        

    <td>
    <input
        type="number"
        min="0"
        max="10"
        step="0.1"
        placeholder="AV1"
        style={{ width: "60px" }}
        value={notas[aluno.id]?.av1 || ""}
        onChange={(e) =>
            setNotas({
                ...notas,
                [aluno.id]: {
                    ...notas[aluno.id],
                    av1: e.target.value
                }
            })
        }
    />
</td>

<td>
    <input
        type="number"
        min="0"
        max="10"
        step="0.1"
        placeholder="AV2"
        style={{ width: "60px" }}
        value={notas[aluno.id]?.av2 || ""}
        onChange={(e) =>
            setNotas({
                ...notas,
                [aluno.id]: {
                    ...notas[aluno.id],
                    av2: e.target.value
                }
            })
        }
    />
</td>

<td>
    <input
        type="number"
        min="0"
        max="10"
        step="0.1"
        placeholder="AV3"
        style={{ width: "60px" }}
        value={notas[aluno.id]?.av3 || ""}
        onChange={(e) =>
            setNotas({
                ...notas,
                [aluno.id]: {
                    ...notas[aluno.id],
                    av3: e.target.value
                }
            })
        }
    />
</td>

<td>
{
(
(
Number(notas[aluno.id]?.av1 || 0) +
Number(notas[aluno.id]?.av2 || 0) +
Number(notas[aluno.id]?.av3 || 0)
) / 3
).toFixed(1)
}
</td>

<td>
    <input
        type="number"
        min="0"
        max="10"
        step="0.1"
        placeholder="Rec"
        style={{ width: "60px" }}
        value={recuperacoes[aluno.id] || ""}
        onChange={(e) =>
            setRecuperacoes({
                ...recuperacoes,
                [aluno.id]: e.target.value
            })
        }
    />
</td>

<td>
{
Math.max(
    (
        Number(notas[aluno.id]?.av1 || 0) +
        Number(notas[aluno.id]?.av2 || 0) +
        Number(notas[aluno.id]?.av3 || 0)
    ) / 3,
    Number(recuperacoes[aluno.id] || 0)
).toFixed(1)
}
</td>
<td>
{
(
Number(notas[aluno.id]?.av1 || 0) +
Number(notas[aluno.id]?.av2 || 0) +
Number(notas[aluno.id]?.av3 || 0)
) === 0
? "⚪ NÃO AVALIADO"

: (
(
Number(notas[aluno.id]?.av1 || 0) +
Number(notas[aluno.id]?.av2 || 0) +
Number(notas[aluno.id]?.av3 || 0)
) / 3
) >= 6

? "🟢 APROVADO"

: Number(recuperacoes[aluno.id] || 0) === 0

? "🟡 RECUPERAÇÃO"

: Number(recuperacoes[aluno.id]) >= 6

? "🟢 APROVADO"

: "🔴 REPROVADO"
}
</td>

<td>
    <button
        onClick={() =>
            salvarAluno(aluno.id)
        }
    >
        💾
    </button>
</td>


                        </tr>

                    ))
                }

            </tbody>

        </table>

        <br />

        <button
            onClick={salvarNotas}
        >
            💾 Salvar Notas
        </button>

    </div>

);


}

export default LancarNotas;
