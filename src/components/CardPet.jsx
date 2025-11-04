import './CardPet.css'
import { useState } from 'react'
import TarefasPet from './TarefasPet'
import Swal from 'sweetalert2'

function CardPet({ pet, setPets }) {
    const [mostrarTarefas, setMostrarTarefas] = useState(false)

    function alternarTarefas() {
        setMostrarTarefas(!mostrarTarefas)
    }

    async function excluirPet() {
        const confirmar = await Swal.fire({
            title: `Excluir ${pet.nome}?`,
            text: "Essa ação não pode ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sim, excluir",
            cancelButtonText: "Cancelar"
        })

        if (confirmar.isConfirmed) {
            await fetch(`http://localhost:3001/pets/${pet.id}`, { method: "DELETE" })
            const respostaLista = await fetch("http://localhost:3001/pets")
            const dados = await respostaLista.json()
            setPets(dados.reverse())
            Swal.fire({ icon: "success", title: "Pet excluído com sucesso 🐾", timer: 1200, showConfirmButton: false })
        }
    }

    async function editarPet() {
        const { value: valores } = await Swal.fire({
            title: `Editar informações de ${pet.nome}`,
            html: `
        <style>
          .campo-editar {
            width: 100%;
            border: 1px solid #d0d0d0;
            border-radius: 8px;
            padding: 12px;
            font-size: 14px;
            color: #333;
            margin: 6px 0;
            background-color: #fff;
            box-sizing: border-box;
          }
          .campo-editar:focus {
            outline: none;
            border-color: #748cab;
            box-shadow: 0 0 0 3px rgba(116,140,171,0.2);
          }
        </style>

        <input id="nome" class="campo-editar" placeholder="Nome" value="${pet.nome || ''}">
        <input id="especie" class="campo-editar" placeholder="Espécie" value="${pet.especie || ''}">

        <select id="sexo" class="campo-editar">
          <option value="">Selecione o sexo</option>
          <option value="Macho" ${pet.sexo === "Macho" ? "selected" : ""}>Macho</option>
          <option value="Fêmea" ${pet.sexo === "Fêmea" ? "selected" : ""}>Fêmea</option>
        </select>

        <select id="castrado" class="campo-editar">
          <option value="">Castrado?</option>
          <option value="Sim" ${pet.castrado === "Sim" ? "selected" : ""}>Sim</option>
          <option value="Não" ${pet.castrado === "Não" ? "selected" : ""}>Não</option>
        </select>

        <input id="idade" type="number" class="campo-editar" placeholder="Idade" value="${pet.idade || ''}">
        <input id="imagem" class="campo-editar" placeholder="URL da imagem" value="${pet.imagem || ''}">
        <textarea id="descricao" class="campo-editar" placeholder="Descrição">${pet.descricao || ''}</textarea>
      `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Salvar alterações",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                return {
                    nome: document.getElementById("nome").value,
                    especie: document.getElementById("especie").value,
                    sexo: document.getElementById("sexo").value,
                    castrado: document.getElementById("castrado").value,
                    idade: Number(document.getElementById("idade").value),
                    imagem: document.getElementById("imagem").value,
                    descricao: document.getElementById("descricao").value
                }
            }
        })

        if (valores) {
            const petEditado = { ...pet, ...valores }

            try {
                const resposta = await fetch(`http://localhost:3001/pets/${pet.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(petEditado)
                })
                if (!resposta.ok) throw new Error("Erro ao editar pet")

                Swal.fire({
                    icon: "success",
                    title: "Informações atualizadas com sucesso 🐾",
                    showConfirmButton: false,
                    timer: 1500
                })

                const respostaLista = await fetch("http://localhost:3001/pets")
                const dados = await respostaLista.json()
                setPets(dados.reverse())
            } catch (erro) {
                console.error("Erro:", erro.message)
            }
        }
    }

    return (
        <div className='cards'>
            <div className='card-esquerda'>
                <img src={pet.imagem} alt={`Foto de ${pet.nome}`} />
            </div>

            <div className='card-direita'>
                <div className="info-e-tarefas">
                    <div className="info-pet">
                        <h3>{pet.nome}</h3>
                        <h4>
                            {pet.especie}
                            {pet.sexo ? ` — ${pet.sexo}` : ""}
                            {pet.castrado ? ` — Castrado: ${pet.castrado}` : ""}
                            {pet.idade ? ` — ${pet.idade} anos` : ""}
                        </h4>

                        <p className="p-desc">{pet.descricao}</p>

                        <div className="botoes-card">
                            <button className="btn-avaliar" onClick={alternarTarefas}>
                                {mostrarTarefas ? "Fechar Tarefas" : "Adicionar Tarefas"}
                            </button>
                            <button className="btn-editar" onClick={editarPet}>Editar Pet</button>
                            <button className="btn-excluir" onClick={excluirPet}>Excluir Pet</button>
                        </div>
                    </div>

                    {mostrarTarefas && (
                        <div className="tarefas-lado">
                            <TarefasPet pet={pet} setPets={setPets} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CardPet
