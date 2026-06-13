import logoSesi from "../assets/logo_sesi.png";
import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


function Boletim() {

    const [busca, setBusca] = useState("");
    const [dados, setDados] = useState([]);

    const buscarBoletim = async () => {

    try {

        const alunoResponse =
    await axios.get(
        `https://sistema-academico-sesi-production.up.railway.app/api/alunos/busca/${busca}`
    );

        const alunoId =
            alunoResponse.data.id;

        const boletimResponse =
            await axios.get(
                `https://sistema-academico-sesi-production.up.railway.app/api/notas/boletim/${alunoId}`
            );

        setDados(
            boletimResponse.data
        );

    } catch (error) {

        console.error(error);

        alert(
            "Aluno não encontrado"
        );

    }

};

    const gerarPDF = () => {

    if (dados.length === 0) {

        alert("Busque um aluno primeiro");

        return;

    }

    const doc = new jsPDF();

    console.log(logoSesi);

    doc.setFontSize(18);

    doc.setFontSize(20);

doc.text(
    "SESI Unidade Escada - PE",
    14,
    15
);

doc.setFontSize(16);

doc.text(
    "BOLETIM ESCOLAR",
    14,
    25
);

    doc.setFontSize(12);

    doc.text(
    `Aluno: ${dados[0].aluno}`,
    14,
    40
);

doc.text(
    `Turma: ${dados[0].turma}`,
    14,
    48
);

    autoTable(doc, {

        startY: 60,

        head: [[
            "Disciplina",
            "U1",
            "U2",
            "U3",
            "U4",
            "Média",
            "Situação"
        ]],

        body: dados.map(item => [

            item.disciplina,

            item.u1_media || "-",
            item.u2_media || "-",
            item.u3_media || "-",
            item.u4_media || "-",

            item.media_anual || "-",

            item.situacao || "-"

        ])

    });

    doc.save(
        `Boletim_${dados[0].aluno}.pdf`
    );

};

    return (

        <div>

            <h2>📄 Boletim do Aluno</h2>

            <input
    type="text"
    placeholder="Digite matrícula ou nome"
    value={busca}
    onChange={(e) =>
        setBusca(e.target.value)
    }
/>

            <button
                onClick={buscarBoletim}
                style={{ marginLeft: "10px" }}
            >
                Buscar
            </button>

            <button
    onClick={gerarPDF}
    style={{
        marginLeft: "10px"
    }}
>
    📄 Gerar PDF
</button>

            <br /><br />

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

                        <th>Disciplina</th>
                        <th>U1</th>
                        <th>U2</th>
                        <th>U3</th>
                        <th>U4</th>
                        <th>Média</th>
                        <th>Situação</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        dados.map((item, index) => (

                            <tr key={index}>

                                <td>{item.disciplina}</td>

                                <td>{item.u1_media || "-"}</td>
                                <td>{item.u2_media || "-"}</td>
                                <td>{item.u3_media || "-"}</td>
                                <td>{item.u4_media || "-"}</td>

                                <td>
                                    {item.media_anual || "-"}
                                </td>

                                <td>
                                    {item.situacao || "-"}
                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default Boletim;