import { useEffect, useState } from "react";
import axios from "axios";

function Professores() {

    const [professores, setProfessores] = useState([]);

    useEffect(() => {

        axios
            .get("https://sistema-academico-sesi-production.up.railway.app/api/professores")
            .then((response) => {

                setProfessores(response.data);

            })
            .catch((error) => {

                console.error(error);

            });

    }, []);

    return (

        <div>

            <h2>👩‍🏫 Professores</h2>

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
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Especialidade</th>
                    </tr>

                </thead>

                <tbody>

                    {professores.map((professor) => (

                        <tr key={professor.id}>
                            <td>{professor.id}</td>
                            <td>{professor.nome}</td>
                            <td>{professor.email}</td>
                            <td>{professor.especialidade}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Professores;