import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BoletimAluno() {

    const { alunoId } = useParams();

    const [boletim, setBoletim] = useState([]);

    useEffect(() => {

        carregarBoletim();

    }, []);

    const carregarBoletim = async () => {

        try {

            const response =
                await axios.get(
                    `https://sistema-academico-sesi-production.up.railway.app/api/notas/boletim/${alunoId}`
                );

            setBoletim(
                response.data
            );

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div>

            <h2>
                📄 Boletim do Aluno
            </h2>

            <table
                border="1"
                cellPadding="10"
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
                        boletim.map(
                            (item, index) => (

                                <tr key={index}>

                                    <td>
                                        {item.disciplina}
                                    </td>

                                    <td>
                                        {item.u1_media}
                                    </td>

                                    <td>
                                        {item.u2_media}
                                    </td>

                                    <td>
                                        {item.u3_media}
                                    </td>

                                    <td>
                                        {item.u4_media}
                                    </td>

                                    <td>
                                        {item.media_anual}
                                    </td>

                                    <td>
                                        {item.situacao}
                                    </td>

                                </tr>

                            )
                        )
                    }

                </tbody>

            </table>

        </div>

    );

}

export default BoletimAluno;