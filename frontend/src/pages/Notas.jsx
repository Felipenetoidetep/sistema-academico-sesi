import { useEffect, useState } from "react";
import axios from "axios";

function Notas() {

    const [notas, setNotas] = useState([]);

    useEffect(() => {

        axios
            .get("https://sistema-academico-sesi-production.up.railway.app/api/notas")
            .then((response) => {

                setNotas(response.data);

            })
            .catch((error) => {

                console.error(error);

            });

    }, []);

    return (

        <div>

            <h2>📝 Notas</h2>

            <table
                border="1"
                cellPadding="10"
                style={{
                    borderCollapse: "collapse",
                    width: "100%"
                }}
            >

                <thead>

                    <tr>

                        <th>Aluno</th>
                        <th>Disciplina</th>
                        <th>U1</th>
                        <th>U2</th>
                        <th>U3</th>
                        <th>U4</th>
                        <th>Média</th>
                        <th>Final</th>
                        <th>Situação</th>

                    </tr>

                </thead>

                <tbody>

                    {notas.map((nota) => (

                        <tr key={nota.id}>

                            <td>{nota.aluno}</td>
                            <td>{nota.disciplina}</td>

                            <td>{nota.u1_media}</td>
                            <td>{nota.u2_media}</td>
                            <td>{nota.u3_media}</td>
                            <td>{nota.u4_media}</td>

                            <td>{nota.media_anual}</td>

                            <td>{nota.nota_final}</td>

                            <td>{nota.situacao}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Notas;