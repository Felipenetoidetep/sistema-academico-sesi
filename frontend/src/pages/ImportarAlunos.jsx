import { useState } from "react";
import axios from "axios";

function ImportarAlunos() {

    const [arquivo, setArquivo] = useState(null);

    const importar = async () => {

        if (!arquivo) {

            alert("Selecione um arquivo Excel");
            return;

        }

        const formData = new FormData();

        formData.append(
            "arquivo",
            arquivo
        );

        try {

            const response =
                await axios.post(
                    "http://localhost:3001/api/importar-alunos",
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data"
                        }
                    }
                );

            alert(
                `${response.data.total} alunos importados com sucesso`
            );

        } catch (error) {

            console.error(error);

            alert(
                "Erro ao importar planilha"
            );

        }

    };

    return (

        <div>

            <h2>
                📁 Importação de Alunos
            </h2>

            <br />

            <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) =>
                    setArquivo(
                        e.target.files[0]
                    )
                }
            />

            <br />
            <br />

            <button
                onClick={importar}
            >
                📤 Importar Planilha
            </button>

        </div>

    );

}

export default ImportarAlunos;