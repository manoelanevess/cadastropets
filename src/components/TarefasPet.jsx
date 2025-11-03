import { useForm } from "react-hook-form"
import { useState } from "react"

export default function TarefasPet({ pet, setPets }) {
  const { register, handleSubmit, reset } = useForm()
  const [tarefas, setTarefas] = useState(pet.tarefas || [])

  async function adicionarTarefa(data) {
    const novaTarefa = {
      descricao: data.descricao,
      data: data.data,
      feito: false
    }

    const petAtualizado = {
      ...pet,
      tarefas: [...tarefas, novaTarefa]
    }

    try {
      const resposta = await fetch(`http://localhost:3001/pets/${pet.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(petAtualizado)
      })
      if (!resposta.ok) throw new Error("Erro ao adicionar tarefa")

      const respostaLista = await fetch("http://localhost:3001/pets")
      const dados = await respostaLista.json()
      setPets(dados.reverse())
      setTarefas(petAtualizado.tarefas)
      reset()
    } catch (erro) {
      console.error("Erro:", erro.message)
    }
  }

  async function alternarFeito(index) {
    const novasTarefas = [...tarefas]
    novasTarefas[index].feito = !novasTarefas[index].feito

    const petAtualizado = { ...pet, tarefas: novasTarefas }

    await fetch(`http://localhost:3001/pets/${pet.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(petAtualizado)
    })
    setTarefas(novasTarefas)
  }

  return (
    <div style={{ marginTop: "15px", background: "#f8f9fa", padding: "15px", borderRadius: "10px" }}>
      <h4>📋 Tarefas</h4>

      <form onSubmit={handleSubmit(adicionarTarefa)} style={{ marginBottom: "10px" }}>
        <input type="text" placeholder="Descrição" {...register("descricao")} required />
        <input type="datetime-local" {...register("data")} required />
        <button type="submit" className="btn-avaliar">Adicionar</button>
      </form>

      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa registrada.</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {tarefas.map((t, i) => (
            <li key={i} style={{
              marginBottom: "8px",
              textDecoration: t.feito ? "line-through" : "none"
            }}>
              <input type="checkbox" checked={t.feito} onChange={() => alternarFeito(i)} />
              {" "}{t.descricao} — <small>{new Date(t.data).toLocaleDateString('pt-BR')} às {new Date(t.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
